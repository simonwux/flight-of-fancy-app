import React from "react";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Menu } from "semantic-ui-react";

export default class Header extends React.Component {
	onLogout() {
		Accounts.logout();
	}

	render() {
		return (
			<Menu secondary size="large">
				<Menu.Menu position="right">
					<Menu.Item>
						Welcome,{"  "}
						{Meteor.user() ? Meteor.user().username : ""}
					</Menu.Item>

					<Menu.Item
						name="logout"
						onClick={this.onLogout.bind(this)}
					/>
				</Menu.Menu>
			</Menu>
		);
	}
}
