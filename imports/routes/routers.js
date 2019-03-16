import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";

import Signup from "../ui/Signup.jsx";
import Login from "../ui/Login.jsx";
import App from "../ui/App.jsx";
import NotFound from "../ui/NotFound.jsx";

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
	<Router history={browserHistory}>
		<Switch>
			<Route exact path="/" component={Login} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/app" component={App} />
			<Route component={NotFound} />
		</Switch>
	</Router>
);
