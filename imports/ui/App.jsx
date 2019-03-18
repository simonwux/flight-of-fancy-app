import React from "react";

import TopicPost from "./TopicPost.jsx";

export default class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Header</h1>
				<h1>Body</h1>

				<TopicPost />

				<h1>Footer</h1>
			</div>
		);
	}
}
