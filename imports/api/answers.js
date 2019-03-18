import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Answers = new Mongo.Collection("AnswersToPost");

if (Meteor.isServer) {
	// the parameter subscribed at the front end
	Meteor.publish("answers", function publishAnswers() {
		return Answers.find(
			{
				// author: Meteor.user().username
			}
		);
	});
}

Meteor.methods({
	"Answers.insert"(ans, postId) {
		check(ans, String);

		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Answers.insert({
			content: ans,
			author: Meteor.user().username,
			likes: 0,
			parentId: postId
		});
	},
	"Answers.updateLikes"(_id) {
		Answers.update({ _id: _id }, { $inc: { likes: 1 } });
	}
});
