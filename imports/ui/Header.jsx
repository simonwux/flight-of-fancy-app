import React from "react";
import { Accounts } from "meteor/accounts-base";
import { Menu } from "semantic-ui-react";
import { Meteor } from "meteor/meteor";

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: "home" 
		};
	}
	onLogout() {
		Accounts.logout();
	}

	

	handleItemClick() {
		(e, { name }) => this.setState({ activeItem: name });
	} 

	render() {
		const { activeItem } = this.state;
		return (
			<div>
				<Menu secondary>
					<Menu.Item
						name="home"
						active={activeItem === "home"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name="messages"
						active={activeItem === "messages"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name="friends"
						active={activeItem === "friends"}
						onClick={this.handleItemClick}
					/>
					<Menu.Menu position="right">
						<Menu.Item>
							Welcome, { Meteor.user() ? Meteor.user().username : "" }
						</Menu.Item>

						<Menu.Item
							name="logout"
							active={activeItem === "logout"}
							onClick={this.onLogout.bind(this)}
						/>
					</Menu.Menu>
				</Menu>
			</div>
		);
	}
}
