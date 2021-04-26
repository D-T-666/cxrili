import React, { Component } from 'react';
import 'css/welcomepage.css';

class WelcomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="center">
				<h1>
					სალამი!
				</h1>
				<h2>
					მე ვარ <mark>ცხრილი</mark>. <br/> დიახ, ის <mark>ცხრილი</mark> რომელსაც მოუთმენლად ელოდი!
				</h2>
				<h4>
					(რამეს დააჭირე)
				</h4>
			</div>
		)
	}
}

export default WelcomePage;