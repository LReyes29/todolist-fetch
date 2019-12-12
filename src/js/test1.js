import React, { Component } from "react";

class Test1 extends Component {
	state = {
		users: [],
		counter: 0
	};
	flag = false;
	incrementCounter = () => {
		this.setState({
			counter: this.state.counter + 1
		});
	};
	render() {
		return (
			<>
				<h1>Titulo</h1>
				<h3>Subtitulo</h3>
				<button onClick={() => this.incrementCounter()}>
					Click {this.state.counter}
				</button>
			</>
		);
	}
}

export default Test1;
