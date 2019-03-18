import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// the collection is named after "Topics" 
// it stores all the topics users post
export const Topics = new Mongo.Collection("Topics");

Meteor.methods({
	"Topics.insert"(topic) {
		check(topic, String);
		// Make sure the user is logged in before inserting a task
		if (! this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		Topics.insert({
			topic: topic,
			author: Meteor.user().username,
			totalAnswers: 0
		});
	}
});

