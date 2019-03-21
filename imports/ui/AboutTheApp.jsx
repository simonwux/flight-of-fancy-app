import React from "react";
import { Icon, List } from "semantic-ui-react";

export default class AboutTheApp extends React.Component {
	render() {
		return (
			<div id="appIntro">
				<p id="appTitle">Flight of Fancy</p>
				<List>
					<List.Item>
						<Icon name="bolt" size="big" />
						Post your noval questions
					</List.Item>
					<br />
					<List.Item>
						<Icon name="comment alternate outline" size="big" />
						{" "}Reply questions
					</List.Item>
					<br />
					<List.Item>
						<Icon name="fly" size="big" />
						Wandering around the content
					</List.Item>
					<br />
					<List.Item>
						<Icon name="smile" size="big" />
						Enjoy the moment. Laugh out loud
					</List.Item>
				</List>
			</div>
		);
	}
}
