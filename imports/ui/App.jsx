import React from "react";
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();

export default class App extends React.Component {	

	Logout() {
		browserHistory.push("/signup");
	}

	render() {
		return (
			<div>
				<h1>Header</h1>
				<h1>Body</h1>

				<button onClick={() => {this.Logout();}}>Logout</button>
			</div>
		);
	}
}


