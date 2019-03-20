import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import SimpleSchema from "simpl-schema";

export const Answers = new Mongo.Collection("AnswersToPost");

if (Meteor.isServer) {
	// the parameter subscribed at the front end
	Meteor.publish("answers", function publishAnswers() {
		return Answers.find(
			{}
		);
	});
}

Meteor.methods({
	"Answers.insert"(ans, postId) {
		check(ans, String);

		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}
		// schema to check 
		new SimpleSchema({
			ans: {
				type: String,
				min: 3,
				max: 280,
				label: "Your answer"
			}
		}).validate({
			ans: ans
		});

		Answers.insert({
			content: ans,
			authorProfile: {
				name: Meteor.user().username,
				avatar: Meteor.user().profile.avatar
			},
			likes: 0,
			parentId: postId,
			createdAt: new Date()
		});
	},
	"Answers.updateLikes"(_id) {
		Answers.update({ _id: _id }, { $inc: { likes: 1 } });
	}
});
