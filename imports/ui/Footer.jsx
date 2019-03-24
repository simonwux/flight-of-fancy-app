import React from "react";
import "./style/footer.css";

export default class Footer extends React.Component {
	render() {
		return (
			<div id="footer">
				<p>
					© 2019, made with passion and ♥️ by{" "}//it's nice that you put your homepage in the footer.
					<a
						href="https://freddydoesit.github.io/freddy/"
						target="blank"
					>
						Freddy
					</a>{" "}
					and{" "}
					<a
						href="https://qimincao.github.io/HomePage_Karen/"
						target="blank"
					>
						Karen
					</a>
				</p>
			</div>
		);
	}
}
