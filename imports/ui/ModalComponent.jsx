import Modal from "react-modal";
import React from "react";

export default class ModalComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			answer: ""
		};
	}

	onChange(event) {
		this.setState({
			answer: event.target.value
		});
	}

	render() {
		return (
			<div>
				<button onClick={() => this.setState({ isOpen: true })}>
					{" "}
					+ Add my answer
				</button>

				<Modal
					isOpen={this.state.isOpen}
					contentLabel="Follow the topic"
				>
					<p>Try to finish the story</p>

					<form>
						<input
							type="text"
							placeholder="your answer"
							value={this.state.answer}
							onChange={this.onChange.bind(this)}
						/>
						<button>Add your answer</button>
					</form>

					<button onClick={() => this.setState({ isOpen: false, answer: "" })}>
						{" "}
						Submit{" "}
					</button>

				</Modal>

			</div>
		);
	}
}
