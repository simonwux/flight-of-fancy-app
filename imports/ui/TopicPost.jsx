import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Topics } from "../api/topics.js";
import { Answers } from "../api/answers";
import ModalComponent from "./ModalComponent.jsx";
import { Input, Message, Comment, Icon, Feed } from "semantic-ui-react";
import moment from "moment";
import "./style/topics.css";

class TopicPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topic: "",
			error: ""
		};
	}

	onChange(event) {
		this.setState({
			topic: event.target.value
		});
	}

	onKey(event) {
		if (event.key === "Enter") {
			Meteor.call(
				"Topics.insert", // method name
				this.state.topic, // parameter

				// arrow function
				(err, res) => {
					if (err) {
						this.setState({
							error: err.reason
						});

						console.log(err);
						return;
					}

					console.log("Topic inserted", res);

					this.setState({
						topic: "",
						error: ""
					});
				}
			);
		}
	}

	renderPostedTopics() {
		return this.props.Topics.map((t, index) => (
			<div key={t._id} className="topicsAndAnswers">
				<Comment>
					<Comment.Avatar src="/images/avatar/small/matt.jpg" />

					<Comment.Content>
						<Comment.Author as="a">{t.author}</Comment.Author>
						<Comment.Metadata>
							<div>{moment(t.createdAt).fromNow()}</div>
						</Comment.Metadata>
						<Comment.Text> {t.topic}</Comment.Text>
						<Comment.Actions>
							<Feed.Meta>
								<Feed.Like>
									<Icon name="comment outline" />{" "}
									{this.props.answerCount[index]}
									{this.props.answerCount[index] <= 1
										? " reply"
										: " replies"}{" "}
								</Feed.Like>
							</Feed.Meta>

							<ModalComponent
								topicID={t._id}
								topicContent={t.topic}
							/>
						</Comment.Actions>
					</Comment.Content>
				</Comment>
			</div>
		));
	}

	render() {
		console.log(this.props.Topics);

		return (
			<div>
				<h2>Post Your Topic</h2>

				{this.state.error ? (
					<Message negative>
						<Message.Header>
							We are sorry we cannot submit your topic
						</Message.Header>
						<p>{this.state.error}</p>
					</Message>
				) : (
					undefined
				)}

				<Input
					fluid
					size="big"
					icon="add circle"
					type="text"
					placeholder="If you were a super hero..."
					value={this.state.topic}
					onChange={this.onChange.bind(this)}
					onKeyPress={this.onKey.bind(this)}
				/>

				<Comment.Group size="large">
					{this.renderPostedTopics()}
				</Comment.Group>
			</div>
		);
	}
}

TopicPost.propTypes = {
	Topics: PropTypes.arrayOf(PropTypes.object).isRequired,
	answerCount: PropTypes.arrayOf(PropTypes.number).isRequired
};

// query and fetch all data from
// Topics collection
// It returns a list of all the posting topics
export default withTracker(() => {
	// gain the access to two collections
	const handle = Meteor.subscribe("topics");
	Meteor.subscribe("answers");
	const topics = Topics.find(
		{},
		{
			sort: {
				createdAt: -1
			}
		}
	).fetch();

	const answerCount = [];

	for (let i = 0; i < topics.length; i++) {
		const count = Answers.find({ parentId: topics[i]._id }).count();
		answerCount.push(count);
	}
	console.log(answerCount);

	return {
		Topics: Topics.find(
			{},
			{
				sort: {
					createdAt: -1
				}
			}
		).fetch(),
		answerCount: answerCount,
		author: Meteor.user(),
		ready: handle.ready()
	};
})(TopicPost);
