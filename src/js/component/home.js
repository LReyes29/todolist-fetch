import React, { useState, useEffect } from "react"; //Hooks

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [message, setMessage] = useState([
		"Cras justo odio",
		"Dapibus ac facilisis in",
		"Morbi leo risus",
		"Porta ac consectetur ac",
		"Vestibulum at eros"
	]);

	const [newMessage, setNewMessage] = useState("");

	function addMessage(e) {
		//console.log(e.keyCode);
		if (e.target.value != "" && e.keyCode == 13) {
			let message = {
				userId: 1,
				id: 1,
				title: e.target.value,
				completed: false
			};
			setMessage(message.concat(message));
			e.target.value = "";
		}
	}

	function deleteMessage(i) {
		//console.log(i);
		const mess = message.slice();
		mess.splice(i, 1);
		setMessage(mess);
	}

	function showDelete(i) {
		let icon = document.querySelector("#item" + i);
		icon.classList.remove("hide");
	}

	function hideDelete(i) {
		let icon = document.querySelector("#item" + i);
		icon.classList.add("hide");
	}

	function getToDos() {
		fetch("https://jsonplaceholder.typicode.com/todos/")
			.then(response => response.json())
			.then(json => setMessage(json));
	}

	useEffect(() => {
		getToDos();
	}, []);

	return (
		<div className="card">
			<div className="card-body">
				<div className="form-group">
					<input
						type="text"
						name=""
						className="form-control"
						placeholder="Insert a new Message"
						//onChange={e => console.log(e.target.value)}
						onKeyDown={e => addMessage(e)}
					/>
				</div>
				<ul className="list-group">
					{message.length > 0 &&
						message.map((item, i) => {
							return (
								<li
									key={i}
									className="list-group-item"
									onMouseOver={() => showDelete(i)}
									onMouseOut={() => hideDelete(i)}>
									{item.title}{" "}
									<i
										id={"item" + i}
										className="fa fa-trash float-right hide"
										onClick={() => deleteMessage(i)}
									/>
								</li>
							);
						})}
				</ul>
				<p className="card-text">
					{message.length > 0
						? message.length + " messages left."
						: "You don't have messages"}
				</p>
			</div>
		</div>
	);
}



export class Home2 extends React.Component {
	/*constructor={
		super();
		this.state={}
	}*/

	state = {
		message: [
			"Cras justo odio",
			"Dapibus ac facilisis in",
			"Morbi leo risus",
			"Porta ac consectetur ac",
			"Vestibulum at eros"
		]
	};

	addMessage(e) {
		//console.log(e.keyCode);
		if (e.target.value != "" && e.keyCode == 13) {
			let message = {
				userId: 1,
				id: 1,
				title: e.target.value,
				completed: false
			};
			this.setState({
				message: this.state.message.concat(message)
			});
			e.target.value = "";
		}
	}

	deleteMessage(i) {
		//console.log(i);
		const mess = this.state.message.slice();
		mess.splice(i, 1);
		this.setState({ message: mess });
	}

	showDelete(i) {
		let icon = document.querySelector("#item" + i);
		icon.classList.remove("hide");
	}

	hideDelete(i) {
		let icon = document.querySelector("#item" + i);
		icon.classList.add("hide");
	}

	getToDos() {
		fetch("https://jsonplaceholder.typicode.com/todos/")
			.then(response => response.json())
			.then(json => this.setState({ message: json }));
	}

	componentDidMount() {
		this.getToDos();
	}
	render() {
		return (
			<div className="card">
				<div className="card-body">
					<div className="form-group">
						<input
							type="text"
							name=""
							className="form-control"
							placeholder="Insert a new Message"
							//onChange={e => console.log(e.target.value)}
							onKeyDown={e => this.addMessage(e)}
						/>
					</div>
					<ul className="list-group">
						{this.state.message.length > 0 &&
							this.state.message.map((item, i) => {
								return (
									<li
										key={i}
										className="list-group-item"
										onMouseOver={() => this.showDelete(i)}
										onMouseOut={() => this.hideDelete(i)}>
										{item.title}{" "}
										<i
											id={"item" + i}
											className="fa fa-trash float-right hide"
											onClick={() =>
												this.deleteMessage(i)
											}
										/>
									</li>
								);
							})}
					</ul>
					<p className="card-text">
						{this.state.message.length > 0
							? this.state.message.length + " messages left."
							: "You don't have messages"}
					</p>
				</div>
			</div>
		);
	}
}
