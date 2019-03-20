import React from "react";
import { Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import AboutTheApp from "./AboutTheApp.jsx";
import Footer from "./Footer.jsx";
import ParticlejsBackground from "./ParticlejsBackground.jsx";
import {
	Container,
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment,
	Label
} from "semantic-ui-react";

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
		let avatar = "https://api.adorable.io/avatars/285/" + username + ".png";

		if (pwd.length < 8) {
			return this.setState({
				error: "Password must be more than 8 characters."
			});
		}

		Accounts.createUser(
			{ username: username, email: email, password: pwd, profile: {avatar: avatar}},
			err => {
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
				<ParticlejsBackground />
				<Container>
					<Grid
						textAlign="center"
						style={{ height: "95vh" }}
						divided="vertically"
						verticalAlign="middle"
						id="grid"
					>
						<Grid.Row columns={2}>
							<Grid.Column>
								<AboutTheApp />
							</Grid.Column>
							<Grid.Column>
								<Header as="h2" color="teal" textAlign="center">
									<Image src="/icon.png" circular /> Sign up
								</Header>
								{this.state.error ? (
									<Label
										basic
										color="red"
										pointing="below"
										size="large"
									>
										{this.state.error}
									</Label>
								) : (
									undefined
								)}
								<Form
									size="large"
									onSubmit={this.onSubmit.bind(this)}
									noValidate
								>
									<Segment stacked>
										<Form.Input
											fluid
											icon="at"
											iconPosition="left"
											type="email"
											name="email"
											placeholder="Email"
										/>
										<Form.Input
											fluid
											icon="users"
											iconPosition="left"
											type="text"
											name="username"
											placeholder="Username"
										/>

										<Form.Input
											fluid
											icon="lock"
											iconPosition="left"
											type="password"
											name="password"
											placeholder="Password"
										/>

										<Button color="teal" fluid size="large">
											Create Account
										</Button>
									</Segment>
								</Form>
								<Message>
									Already has an account?
									<Link to="/"> login</Link>
								</Message>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
				<Footer />
			</div>
		);
	}
}
