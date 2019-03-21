import React from "react";
import Particle from "particlesjs";
import "./style/particle.css";

export default class ParticlejsBackground extends React.Component {
	componentDidMount() {
		Particle.init({
			selector: ".background",
			maxParticles: 300,
			sizeVariations: 6,
			color: ["#95afc0"],
			speed: 0.5
		});
	}
	render() {
		return <canvas className="background" />;
	}
}
