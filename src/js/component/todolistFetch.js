import React from "react";

export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			message: [
				"Cras justo odio",
				"Dapibus ac facilisis in",
				"Morbi leo risus",
				"Porta ac consectetur ac",
				"Vestibulum at eros"
			]
		};
	}

	addTask(e) {
		//console.log(e.keyCode);
		if (e.target.value != "" && e.keyCode == 13) {
			let task = {
				userId: 1,
				id: 1,
				title: e.target.value,
				completed: false
			};
			this.state.message.unshift(task);
			this.setState({
				message: this.state.message
			});
			e.target.value = "";
			this.putToDos(this.state.message);
		}
	}

	deleteTask(i) {
		//console.log(i);
		const mess = this.state.message.slice();
		mess.splice(i, 1);
		this.setState({ message: mess });
		this.putToDos(this.state.message);
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
		fetch("http://jsonplaceholder.typicode.com/todos")
			.then(response => response.json())
			.then(json => this.setState({ message: json }));
	}

	putToDos(data) {
		fetch("http://assets.breatheco.de/apis/fake/todos/user/yorman", {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				//console.log(resp.ok);  // will be true if the response is successfull
				//console.log(resp.status);  // the status code = 200 or code = 400 etc.
				//console.log(resp.text()); //  will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				console.log(data);
				//here is were your code should start after the fetch finishes
				//console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				console.log(error);
				//error handling
				//console.log(error);
			});
	}

	componentDidMount() {
		this.getToDos();
	}

	render() {
		return (
			<div className="card">
				<h1>TODO List</h1>
				<div className="card-body">
					<div className="form-group">
						<input
							type="text"
							name=""
							className="form-control"
							placeholder="Insert a new Message"
							//onChange={e => console.log(e.target.value)}
							onKeyDown={e => this.addTask(e)}
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
											onClick={() => this.deleteTask(i)}
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
