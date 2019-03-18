import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Topics } from "../api/topics.js";

import ModalComponent from "./ModalComponent.jsx";

class TopicPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topic: ""
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
						alert("There was error inserting. Check the console.");
						console.log(err);
						return;
					}

					console.log("Topic inserted", res);

					this.setState({
						topic: ""
					});
				}
			);
		}
	}

	renderPostedTopics() {
		return this.props.Topics.map(t => (
			<div key={t._id} className="card">
				Author {t.author} : {t.topic}
				<ModalComponent postID={t._id} />
			</div>
		));
	}

	render() {
		console.log(this.props.Topics);

		return (
			<div>
				<h2>Post Your Topic</h2>
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
	Topics: PropTypes.arrayOf(PropTypes.object).isRequired
};

// query and fetch all data from
// Topics collection
// It returns a list of all the posting topics
export default withTracker(() => {
	const handle = Meteor.subscribe("topics");
	return {
		Topics: Topics.find(
			{},
			{
				sort: {
					createdAt: -1
				}
			}
		).fetch(),
		author: Meteor.user(),
		ready: handle.ready()
	};
})(TopicPost);
