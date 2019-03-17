import { Mongo } from "meteor/mongo";

// the collection is named after "messages4Fancy"
export const Messages = new Mongo.Collection("messages4Fancy");
