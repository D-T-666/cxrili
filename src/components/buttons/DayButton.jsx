import React, { Component } from 'react';

class DayButton extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<button 
				onClick={() => this.props.onClick(this.props.name)} 
				className={(this.props.className ? this.props.className+" ": "")}>
				{this.props.children}
			</button>
		)
	}
}

export default DayButton