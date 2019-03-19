import React from "react";
import { Accounts } from "meteor/accounts-base";
import TopicPost from "./TopicPost.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Container } from "semantic-ui-react";

export default class App extends React.Component {
	onLogout() {
		Accounts.logout();
	}

	render() {
		return (
			<div>
				<Container>
					<Header />

					<button onClick={this.onLogout.bind(this)}>Logout</button>

					<TopicPost />

					<Footer />
				</Container>
			</div>
		);
	}
}
