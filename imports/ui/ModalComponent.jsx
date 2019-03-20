import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Answers } from "../api/answers.js";
import moment from "moment";
import {
	Button,
	Header,
	Icon,
	Modal,
	Form,
	Input,
	Message,
	Feed
} from "semantic-ui-react";
import "./style/answers.css";

class ModalComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			answer: "",
			error: "",
			visible: 3
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

	loadMore() {
		this.setState({ visible: this.state.visible + 4 });
	}

	closeMore() {
		this.setState({ visible: 3 });
	}

	// if the number of comments is greater than 3, display "more" and "close" button
	renderLoadMore() {
		let matchedAnswer = this.props.Answers.filter(
			a => a.parentId === this.props.topicID
		);

		if (matchedAnswer.length > 3) {
			return (
				<div>
					<Button onClick={this.loadMore.bind(this)}>More</Button>
					<Button onClick={this.closeMore.bind(this)}>Close</Button>
				</div>
			);
		}
	}

	renderModal() {
		return (
			<Modal
				trigger={
					<Button
						labelPosition="left"
						icon
						primary
						onClick={() => this.setState({ isOpen: true })}
					>
						<Icon name="edit" />
						Add reply
					</Button>
				}
				open={this.state.isOpen}
				basic
				size="small"
			>
				<Header
					icon={<Icon name="grav" inverted color="green" />}
					content="Use your imagination"
				/>

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
					<h3>{this.props.topicContent}</h3>
					<Form>
						<Input
							fluid
							icon="pencil alternate"
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
		);
	}

	renderSubmittedAnswer() {
		let matchedAnswer = this.props.Answers.filter(
			a => a.parentId === this.props.topicID
		);

		return matchedAnswer.slice(0, this.state.visible).map(a => (
			<div key={a._id}>
				<Feed>
					<Feed.Event>
						<Feed.Label image={a.authorProfile.avatar} />
						<Feed.Content>
							<Feed.Summary>
								<Feed.User>{a.authorProfile.name}</Feed.User>{" "}
								replied a new answer
								<Feed.Date>
									{moment(a.createdAt).fromNow()}
								</Feed.Date>
							</Feed.Summary>
							<Feed.Extra text>{a.content}</Feed.Extra>
							<Feed.Meta>
								<Feed.Like
									onClick={() =>
										Meteor.call(
											"Answers.updateLikes",
											a._id
										)
									}
								>
									<Icon name="like" />
									{a.likes} Likes
								</Feed.Like>
							</Feed.Meta>
						</Feed.Content>
					</Feed.Event>
				</Feed>
			</div>
		));
	}

	render() {
		return (
			<div>
				<br />
				{this.renderModal()}
				<Feed>{this.renderSubmittedAnswer()}</Feed>
				{this.renderLoadMore()}
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
	const handle = Meteor.subscribe("answers");
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
		ready: handle.ready()
	};
})(ModalComponent);
