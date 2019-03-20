import React from "react";
import "./style/description.css";
import { Image } from "semantic-ui-react";

export default class Description extends React.Component {
	render() {
		return (
			<div id="description">
				<Image src="/title.png" fluid />
				<p id="appDesc">
					Do you get bored of serious content? <br />I know you are
					tired. <br />I understand you have your imagination at bay
					for a long time. <br /> <br />
					Come on, have some fun while wandering our App. <br />
					Post your idea and answer strange questions. <br />
					It is all about out of box. <br />
					Everything is not normal. Enjoy this moment. <br />
					Laugh out loud.
				</p>
			</div>
		);
	}
}
