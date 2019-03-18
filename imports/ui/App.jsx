import React from "react";
import { Accounts } from "meteor/accounts-base";
import TopicPost from "./TopicPost.jsx";

export default class App extends React.Component {
	onLogout() {
		Accounts.logout();
	}

	render() {
		return (
			<div>
				<h1>Header</h1>
				<button onClick={this.onLogout.bind(this)}>Logout</button>

				<h1>Body</h1>

				<TopicPost />

				<h1>Footer</h1>
			</div>
		);
	}
}
