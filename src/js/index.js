//import react into the bundle
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";

import Test1 from "./test1";

//import your own components
const Home2 = props => {
	const [users, setUsers] = useState([]);
	const [counter, setCounter] = useState(0);
	function getUsers() {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then(resp => {
				//console.log(resp.status);
				return resp.json();
			})
			.then(data => {
				//console.log(data);
				setUsers(data);
			})
			.catch(error => console.log(error));
	}
	useEffect(() => {
		// componentDidMount(){}
		getUsers();
	});

	return (
		<>
			<h1>Users:</h1>
			<ul>
				{users.length > 0 &&
					users.map((item, i) => {
						return <li key={i}>{item.name}</li>;
					})}
			</ul>
			<button onClick={() => setCounter(counter + 1)}>
				Click {counter}
			</button>
		</>
	);
};

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	componentDidMount() {
		this.getUsers();
	}

	getUsers = () => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then(resp => {
				console.log(resp.status);
				return resp.json();
			})
			.then(data => {
				console.log(data);
				//setUsers(data);
				this.setState({
					users: data
				});
			})
			.catch(error => console.log(error));
	};

	render() {
		return (
			<>
				<h1>{this.props.name}</h1>
				<ul>
					{this.state.users.length > 0 &&
						this.state.users.map((item, i) => {
							return <li key={i}>{item.name}</li>;
						})}
				</ul>
			</>
		);
	}
}

Home.propTypes = {
	name: PropTypes.string
};

//render your react application
ReactDOM.render(
	<div>
		<Home name="Listado de Usuarios" />
		<Home2 />
		<Test1 />
	</div>,
	document.querySelector("#app")
);
