import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { Tracker } from "meteor/tracker";

import Signup from "../ui/Signup.jsx";
import Login from "../ui/Login.jsx";
import App from "../ui/App.jsx";
import NotFound from "../ui/NotFound.jsx";

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;

const authPages = ["/app"];
const unAuthpages = ["/", "signup"];


export const renderRoutes = () => (
	<Router history={browserHistory}>
		<Switch>
			<Route exact path="/" component={Login}/>
			<Route exact path="/signup" component={Signup}/>
			<Route exact path="/app" component={App} />
			<Route component={NotFound} />
		</Switch>
	</Router>
);


// Tracking auth status
Tracker.autorun(() => {
	const isLoggedin = !!Meteor.userId();
	// get the current location
	const pathname = browserHistory.location.pathname;

	const isUnAuthPage = unAuthpages.includes(pathname);
	const isAuthPage = authPages.includes(pathname);

	// if user on an unauthenticated page and logged in, redirect to /app
	if (isUnAuthPage && isLoggedin) {
		browserHistory.push("/app");
	}
	// if user on an authenticated page but not logged in, redirect to /
	if (isAuthPage && !isLoggedin) {
		browserHistory.push("/");
	}
});
 