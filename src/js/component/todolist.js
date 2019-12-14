import React, { useState, useEffect } from "react";

export function Home() {
	const [task, setTask] = useState([
		"Cras justo odio",
		"Dapibus ac facilisis in",
		"Morbi leo risus",
		"Porta ac consectetur ac",
		"Vestibulum at eros"
	]);

	const [newTask, setNewTask] = useState("");

	function addTask(e) {
		if (e.target.value != "" && e.keyCode == 13) {
			setTask(task.concat(e.target.value));
			e.target.value = "";
		}
	}

	function deleteTask(i) {
		const tk = task.slice();
		tk.splice(i, 1);
		setTask(tk);
	}

	function showDelete(i) {
		let icon = document.querySelector("#item" + i);
		icon.classList.remove("hide");
	}

	function hideDelete(i) {
		let icon = document.querySelector("#item" + i);
		icon.classList.add("hide");
	}

	return (
		<div className="todoList">
			<div className="body-group">
				<div className="form-group">
					<h1>TODO List</h1>
					<input
						type="text"
						name=""
						className="form-control"
						placeholder="Insert a New Task"
						onKeyDown={e => addTask(e)}
					/>
				</div>
				<ul className="list-group">
					{task.length > 0 &&
						task.map((item, i) => {
							return (
								<li
									className="list-group-item"
									key={i}
									onMouseOver={() => showDelete(i)}
									onMouseOut={() => hideDelete(i)}>
									{item}
									<i
										id={"item" + i}
										className="fa fa-trash float-right hide"
										onClick={() => deleteTask(i)}
									/>
								</li>
							);
						})}
				</ul>
				<p className="text-group" />
				{task.length > 0
					? task.length + " items left."
					: "You don't have pending tasks."}
			</div>
		</div>
	);
}
