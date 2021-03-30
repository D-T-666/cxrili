import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DayButton extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<Link to={`/${this.props.name}`}>
				<button onClick={() => this.props.onClick(this.props.name)} 
								className={(this.props.className ? this.props.className+" ": "")}>
					{this.props.children}
				</button>
			</Link>
		)
	}
}

export default DayButton