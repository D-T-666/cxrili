import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class HomeButton extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<Link to="/cxrili/week" >
				<button className="home">
					ცხრილი
				</button>
			</Link>
		)
	}
}

export default HomeButton