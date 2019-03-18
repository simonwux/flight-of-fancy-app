import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { Accounts } from "meteor/accounts-base";

Accounts.validateNewUser(user => {
	const username = user.username;
	const email = user.emails[0].address;

	const userSchema = new SimpleSchema({
		username: {
			type: String,
			min: 2,
			max: 30
		},

		email: {
			type: String,
			regEx: SimpleSchema.RegEx.Email
		}
	});

	try {
		userSchema.validate({
			username: username,
			email: email
		});
	} catch (e) {
		// console.log(e);
		throw new Meteor.Error(403, e.message);
	}

	return true;
});
