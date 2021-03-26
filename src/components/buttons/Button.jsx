import React, { Component } from 'react';

class Button extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<button className={(this.props.className ? this.props.className+" ": "")}>
				{this.props.children}
			</button>
		)
	}
}

export default Button