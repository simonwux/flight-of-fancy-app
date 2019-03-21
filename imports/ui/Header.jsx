import React from "react";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Menu} from "semantic-ui-react";


export default class Header extends React.Component {
	onLogout() {
		Accounts.logout();
	}

	render() {
		let user = Meteor.user() ? Meteor.user().username : "";

		return (
			<div id="header">
				<Menu secondary>
					<Menu.Menu position="right">
						<Menu.Item>
							Welcome,{" "}
							{user}
						</Menu.Item>

						<Menu.Item
							name="logout"
							onClick={this.onLogout.bind(this)}
						/>
					</Menu.Menu>
				</Menu>
			</div>
		);
	}
}


