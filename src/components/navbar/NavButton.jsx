import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NavButton extends Component{
	constructor (props) {
		super(props);

		this.state = {};
	}

	getClassname() {
		return "nav-button"+
		(this.props.active?" active":"")+
		(this.props.className?" "+this.props.className:"");
	}
	
	render () {
		return (
			<li>
				<Link to={this.props.to} className={this.getClassname()} onClick={() => this.props.buttonClicked(this.props.ind)}>
					{this.props.children}
				</Link>
			</li>
		);
	}
};

export default NavButton;
