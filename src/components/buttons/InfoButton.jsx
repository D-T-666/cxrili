import React, { Component } from 'react';

class InfoButton extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

  handleClick() {
		alert("no alerts pls");
  }

	render() {
		return (
			<button className="nogrow" onClick={this.handleClick.bind(this)}>
				ⓘ
			</button>
		)
	}
}

export default InfoButton