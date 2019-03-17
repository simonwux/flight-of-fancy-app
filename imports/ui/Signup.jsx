import React from "react";
import { Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";

export default class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ""
		};
	}

	onSubmit(e) {
		e.preventDefault();

		let username = e.target.username.value.trim();
		let email = e.target.email.value.trim();
		let pwd = e.target.password.value.trim();

		Accounts.createUser(
			{ username: username, email: email, password: pwd },
			err => {
				console.log(err)
				if (err) {
					this.setState({
						error: err.reason
					});
				} else {
					this.setState({
						error: ""
					});
				}
			}
		);
	}

	render() {
		return (
			<div>
				<h1>Sign up</h1>

				{this.state.error ? <p>{this.state.error}</p> : undefined}

				<form onSubmit={this.onSubmit.bind(this)}>
					<input
						type="text"
						name="username"
						placeholder="Username"
						required
					/>
					<input type="email" name="email" placeholder="Email" />
					<input
						type="password"
						name="password"
						placeholder="Password"
					/>
					<button>Create Account</button>
				</form>

				<Link to="/">login in </Link>
			</div>
		);
	}
}
