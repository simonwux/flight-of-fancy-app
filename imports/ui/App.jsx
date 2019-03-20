import React from "react";

import TopicPost from "./TopicPost.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Container, Grid } from "semantic-ui-react";
import Description from "./Description.jsx";

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Container>
					<Header />

					<br />
					<Description />
					<br />
					
					<Grid textAlign="center" verticalAlign="middle">
						<Grid.Row>
							<TopicPost />
						</Grid.Row>
					</Grid>

					<Footer />
				</Container>
			</div>
		);
	}
}
