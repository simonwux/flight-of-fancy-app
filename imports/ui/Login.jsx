import React from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import AboutTheApp from "./AboutTheApp.jsx";
import Footer from "./Footer.jsx";
import Particle from "particlesjs";
import { Container, Grid, Input, Form, Button } from "semantic-ui-react";
import "./style/Login.css";

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ""
		};
	}

	componentDidMount() {
		Particle.init({
			selector: ".background",
			maxParticles: 120,
			color: ["#95afc0"],
			speed: 1,
			connectParticles: true
		});
	}

	onSubmit(e) {
		e.preventDefault();

		let email = e.target.email.value.trim();
		let pwd = e.target.password.value.trim();

		Meteor.loginWithPassword({ email: email }, pwd, err => {
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
				<canvas className="background" />
				<Container>
					<Grid divided="vertically" verticalAlign="middle" id="grid">
						<Grid.Row columns={2}>
							<Grid.Column>
								<AboutTheApp />
							</Grid.Column>
							<Grid.Column>
								<h1>Login here</h1>

								{this.state.error ? (
									<p>{this.state.error}</p>
								) : (
									undefined
								)}

								<Form
									onSubmit={this.onSubmit.bind(this)}
									noValidate
								>
									<Form.Field>	
										<Input
											icon="at"
											iconPosition="left"
											type="email"
											name="email"
											placeholder="Email"
										/>
									</Form.Field>

									<Form.Field>
										<Input
											icon="users"
											iconPosition="left"
											type="password"
											name="password"
											placeholder="Password"
										/>
									</Form.Field>

									
									<Button>Login</Button>
								</Form>

								<Link to="/signup">signup</Link>
							</Grid.Column>
						</Grid.Row>
						<Footer />
					</Grid>
				</Container>
			</div>
		);
	}
}
