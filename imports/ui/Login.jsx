import React from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";


export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ""
		};
	}

	onSubmit(e) {
		e.preventDefault();

		let email = e.target.email.value.trim();
		let pwd =  e.target.password.value.trim();

		Meteor.loginWithPassword({email: email}, pwd, (err) => {
			console.log("Login callback", err);
		});
	}

	render() {
		return (
			<div>
				<h1>Login here</h1>

				<form onSubmit={this.onSubmit.bind(this)}>
					<input type="email" name="email" placeholder="Email"/>
					<input type="password" name="password" placeholder="Password"/>
					<button>Login</button>
				</form>

				<Link to="/signup">signup</Link>
			</div>
		);
	}
}
