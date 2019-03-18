import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { Tracker } from "meteor/tracker";
import { renderRoutes, authStatus }  from "../imports/routes/routers";

Tracker.autorun(() => {
	const isLoggedin = !!Meteor.userId();
	authStatus(isLoggedin);
});

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById("react-target"));
});
