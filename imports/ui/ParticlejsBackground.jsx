import React from "react";
import Particle from "particlesjs";
import "./style/particle.css";

export default class ParticlejsBackground extends React.Component {
	componentDidMount() {
		Particle.init({
			selector: ".background",
			maxParticles: 120,
			color: ["#95afc0"],
			speed: 0,
			connectParticles: true
		});
	}
	render() {
		return <canvas className="background" />;
	}
}
