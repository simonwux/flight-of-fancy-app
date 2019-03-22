import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Topics } from "../api/topics.js";
import { Answers } from "../api/answers";
import ModalComponent from "./ModalComponent.jsx";
import { Input, Message, Comment, Icon, Feed, Grid } from "semantic-ui-react";
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
				this.state.topic.trim(), // parameter

				// arrow function
				(err, res) => {
					if (err) {
						this.setState({
							error: err.reason
						});

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
					<Comment.Avatar src={t.authorProfile.avatar} />
					<Comment.Content>
						<Comment.Author as="a">
							{t.authorProfile.name}
						</Comment.Author>
						<Comment.Metadata>
							<div>{moment(t.createdAt).fromNow()}</div>
						</Comment.Metadata>
						<Comment.Text>
							{" "}
							<h2>{t.topic}</h2>
						</Comment.Text>
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
		return (
			<Grid textAlign="center" verticalAlign="middle" columns="equal">
				<Grid.Row>
					<Grid.Column width={10}>
						{this.state.error ? (
							<Message negative>
								<Message.Header>
									Oops... we cannot submit your topic.
								</Message.Header>
								<p>{this.state.error}</p>
							</Message>
						) : (
							undefined
						)}

						<Input
							fluid
							size="big"
							icon="bolt"
							type="text"
							placeholder="If you were a super hero..."
							value={this.state.topic}
							onChange={this.onChange.bind(this)}
							onKeyPress={this.onKey.bind(this)}
						/>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Comment.Group size="large">
						{this.renderPostedTopics()}
					</Comment.Group>
				</Grid.Row>
			</Grid>
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
