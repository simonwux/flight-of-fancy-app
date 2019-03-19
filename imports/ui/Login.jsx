import React from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import AboutTheApp from "./AboutTheApp.jsx";
import Footer from "./Footer.jsx";
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
import ParticlejsBackground from "./ParticlejsBackground.jsx";

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ""
		};
	}

	onSubmit(e) {
		e.preventDefault();

		let username = e.target.username.value.trim();
		let pwd = e.target.password.value.trim();

		Meteor.loginWithPassword({ username: username }, pwd, err => {
			if (err) {
				this.setState({
					error: "Login Failed. Please check email and password."
				});
			} else {
				this.setState({
					error: ""
				});
			}
		});
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
									<Image src="/logo.png" /> Log-in to your
									account
								</Header>
								{this.state.error ? (
									<Label basic color="red" pointing="below" size="large">
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
											icon="user"
											iconPosition="left"
											type="text"
											name="username"
											placeholder="Username"
										/>
										<Form.Input
											fluid
											icon="lock"
											iconPosition="left"
											placeholder="Password"
											name="password"
											type="password"
										/>

										<Button color="teal" fluid size="large">
											Login
										</Button>
									</Segment>
								</Form>
								<Message>
									New to us?{" "}
									<Link to="/signup"> Sign up</Link>
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
