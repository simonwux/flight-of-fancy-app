import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

// the collection is named after "Topics"
// it stores all the topics users post
export const Topics = new Mongo.Collection("Topics");

if (Meteor.isServer) {
	Meteor.publish("topics", function publishTopics() {
		return Topics.find(
			{
				
			},
			{
				limit: 10
			}
		);
	});
}

Meteor.methods({
	"Topics.insert"(topic) {

		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		// validate check: the topic should be a string
		// with minimum 10 characters and maximum 280 characters
		new SimpleSchema({
			topic: {
				type: String,
				min: 10,
				max: 280,
				label: "Your topic"
			}
		}).validate({
			topic: topic
		});

		Topics.insert({
			topic: topic,
			author: Meteor.user().username,
			createdAt: Date.now(),
			totalAnswers: 0
		});
	}
});
