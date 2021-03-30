import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DayTableBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<Link to={`/day/${this.props.day}`} className={"day-table-block"+(this.props.isToday?" today":"")}>
					<h1 className="title">{this.props.name}</h1>
					<ul>
						{this.props.table.map((entry, index) => 
							<li>{entry}</li>
							)}
					</ul>
			</Link>
		)
	}
}

export default DayTableBlock;