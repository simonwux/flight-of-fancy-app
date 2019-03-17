import React, { Component } from "react";
import PropTypes from "prop-types";

import { withTracker } from "meteor/react-meteor-data";
import { Messages } from "../api/messages.js";

class TopicPost extends Component {
	renderPostedTopics() {
		return this.props.messages4Fancy.map(m => 
			<div key={m._id}>{m.message}</div>
		);
	}

	render() {
		console.log(this.props.messages4Fancy);
		return (
			<div>
				<h2>Post Your Topic</h2>
				<label htmlFor="topic">
					Topic: { }
					<input type="text" placeholder="Enter your topic here" />
				</label>
				<div className="topic">
					{ this.renderPostedTopics() }
				</div>
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