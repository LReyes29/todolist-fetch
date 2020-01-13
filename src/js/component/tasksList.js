import React, { Component } from "react";
import PropTypes from "prop-types";

export class TasksList extends Component {
	constructor(props) {
		super(props);
	}

	showDelete(i) {
		let icon = document.querySelector("#item" + i);
		icon.classList.remove("hide");
	}

	hideDelete(i) {
		let icon = document.querySelector("#item" + i);
		icon.classList.add("hide");
	}

	render() {
		let listado = this.props.tasks.map((item, i) => {
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
						onClick={() => this.props.delete(i)}
					/>
				</li>
			);
		});
		return <ul className="list-group">{listado}</ul>;
	}
}

TasksList.propTypes = {
	tasks: PropTypes.array,
	delete: PropTypes.func
};
