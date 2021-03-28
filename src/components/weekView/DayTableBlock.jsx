import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DayTableBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<Link to={`/day/${this.props.day}`}>
				<li className="day-table-block">
					<h1 className="title">{this.props.name}</h1>
					<ul>
						{this.props.table.map((entry, index) => 
							<li>{entry}</li>
							)}
					</ul>
				</li>
			</Link>
		)
	}
}

export default DayTableBlock;