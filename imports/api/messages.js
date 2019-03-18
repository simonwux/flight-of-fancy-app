import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// the collection is named after "Topics"
// it stores all the topics users post
export const Topics = new Mongo.Collection("Topics");

if (Meteor.isServer) {
	Meteor.publish("topics", function publishTopics() {
		return Topics.find(
			{
				// author: Meteor.user().username
			},
			{
				limit: 10
			}
		);
	});
}

Meteor.methods({
	"Topics.insert"(topic) {
		check(topic, String);
		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Topics.insert({
			topic: topic,
			author: Meteor.user().username,
			createdAt: Date.now(),
			totalAnswers: 0
		});
	}
});
