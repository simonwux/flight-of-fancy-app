import React from "react";
import { Accounts } from "meteor/accounts-base";
import TopicPost from "./TopicPost.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default class App extends React.Component {
	onLogout() {
		Accounts.logout();
	}



	render() {
		return (
			<div>
				<Header />
				
				<button onClick={this.onLogout.bind(this)}>Logout</button>

				<h1>Body</h1>

				<TopicPost />

				<Footer />
				
			</div>
		);
	}
}
