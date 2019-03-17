import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "./Table.jsx";
import { Button } from "reactstrap";
import { withTracker } from "meteor/react-meteor-data";
import { Messages } from "../api/messages.js";

class TopicPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ""
		};
	}

	onChange(event) {
		this.setState({
			message: event.target.value
		});
	}

	onKey(event) {
		if (event.key === "Enter") {
			Messages.insert(
				{
					message: this.state.message
				},
				(err, res) => {
					if (err) {
						alert("There was error inserting. Check the console.");
						console.log(err);
						return;
					}
					console.log("Message inserted", res);
					this.setState({
						message: ""
					});
				}
			);
		}
	}

	onClick() {
		
	}

	renderPostedTopics() {
		return this.props.messages4Fancy.map(m => (
			<div key={m._id}>
				{m.message}
				<Button 
					variant="light"
					// onClick={this.onClick.bind(this)}
				>Follow It
				</Button>
			</div>
		));
	}

	render() {
		console.log(this.props.messages4Fancy);
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
				{/* 
					for each topic, it should be a block for users
					who are interested to follow
				*/}
				<div className="topic">
					{this.renderPostedTopics()}
				</div>

				<Table />
				
			</div>
		);
	}
}

TopicPost.propTypes = {
	messages4Fancy: PropTypes.arrayOf(PropTypes.object).isRequired
};

// query and fetch all data from
// messages4Fancy collection
// it returns a list of all the posting topics
export default withTracker(() => {
	return {
		messages4Fancy: Messages.find({}).fetch()
	};
})(TopicPost);
