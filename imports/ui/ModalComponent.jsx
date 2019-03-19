import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Answers } from "../api/answers.js";
import {
	Button,
	Header,
	Icon,
	Modal,
	Form,
	Input,
	Message
} from "semantic-ui-react";

class ModalComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			answer: "",
			error: ""
		};
	}

	onChange(event) {
		this.setState({
			answer: event.target.value
		});
	}

	onClick() {
		Meteor.call(
			"Answers.insert", // method name
			this.state.answer, // parameter
			this.props.topicID,
			// arrow function
			(err, res) => {
				if (err) {
					this.setState({
						isOpen: true,
						error: err.reason
					});
					console.log(err);
				} else {
					console.log("Answer submitted", res);

					this.setState({
						answer: "",
						error: "",
						isOpen: false
					});
				}
			}
		);
	}

	renderSubmittedAnswer() {
		let matchedAnswer = this.props.Answers.filter(
			a => a.parentId === this.props.topicID
		);

		return matchedAnswer.map(a => (
			<div key={a._id}>
				Author {a.author} : {a.content}
				<button
					onClick={() => Meteor.call("Answers.updateLikes", a._id)}
				>
					{a.likes}
				</button>
			</div>
		));
	}

	render() {
		return (
			<div>
				<Modal
					trigger={
						<Button onClick={() => this.setState({ isOpen: true })}>
							Add my answer
						</Button>
					}
					open={this.state.isOpen}
					basic
					size="small"
				>
					<Header icon={<Icon name="grav" inverted color="green"/>} content="Use your imagination" />

					{this.state.error ? (
						<Message negative>
							<Message.Header>
								We are sorry we cannot submit your answer
							</Message.Header>
							<p>{this.state.error}</p>
						</Message>
					) : (
						undefined
					)}
					<Modal.Content>
						<h3>
							{this.props.topicContent}
						</h3>
						<Form>
							<Input
								fluid
								icon="search"
								type="text"
								placeholder="your answer"
								value={this.state.answer}
								onChange={this.onChange.bind(this)}
							/>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button
							color="green"
							onClick={this.onClick.bind(this)}
							inverted
						>
							<Icon name="checkmark" /> Submit
						</Button>
						<Button
							color="green"
							onClick={() => this.setState({ isOpen: false })}
							inverted
						>
							<Icon name="cancel" /> Cancel
						</Button>
					</Modal.Actions>
				</Modal>

				<div className="answer">{this.renderSubmittedAnswer()}</div>
			</div>
		);
	}
}

ModalComponent.propTypes = {
	topicID: PropTypes.string.isRequired,
	Answers: PropTypes.arrayOf(PropTypes.object).isRequired,
	topicContent: PropTypes.string.isRequired
};

// higher order component
export default withTracker(() => {
	const handle1 = Meteor.subscribe("answers");
	return {
		Answers: Answers.find(
			{},
			{
				sort: {
					likes: -1
				}
			}
		).fetch(),
		author: Meteor.user(),
		ready: handle1.ready()
	};
})(ModalComponent);
