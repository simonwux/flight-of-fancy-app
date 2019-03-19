import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { renderRoutes }  from "../imports/routes/routers";
import "semantic-ui-css/semantic.min.css";

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById("react-target"));
});
