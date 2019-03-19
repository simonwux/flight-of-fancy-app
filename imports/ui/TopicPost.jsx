import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Topics } from "../api/topics.js";
import { Answers } from "../api/answers";

import ModalComponent from "./ModalComponent.jsx";

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

	callBackFunToModal(totalAnswers) {
		this.setState({
			totalAnswers: totalAnswers
		});
	}

	renderPostedTopics() {
		return this.props.Topics.map((t, index) => (
			<div key={t._id} className="card">
				Author {t.author} : {t.topic} Total:{" "}
				{console.log(t)}
				{this.props.answerCount[index]}
				<ModalComponent
					postID={t._id}
					callbackFromParent={totalAnswers => {
						this.callBackFunToModal(totalAnswers);
					}}
				/>
			</div>
		));
	}

	render() {
		console.log(this.props.Topics);

		return (
			<div>
				<h2>Post Your Topic</h2>

				{this.state.error ? <p>{this.state.error}</p> : undefined}

				<label htmlFor="topic">
					Topic: {}
					<input
						type="text"
						placeholder="Enter your topic here"
						value={this.state.topic}
						onChange={this.onChange.bind(this)}
						onKeyPress={this.onKey.bind(this)}
					/>
				</label>

				<div className="topic">{this.renderPostedTopics()}</div>
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
