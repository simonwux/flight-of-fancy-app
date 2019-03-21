import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { renderRoutes }  from "../imports/routes/routers";

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById("react-target"));
});
