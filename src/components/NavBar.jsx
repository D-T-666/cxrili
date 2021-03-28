import React, { Component } from 'react';
import Button from "components/buttons/Button";
import ThemeButton from "components/buttons/ThemeButton";
import HomeButton from "components/buttons/HomeButton";
import InfoButton from "components/buttons/InfoButton";

class NavBar extends Component{
	constructor (props) {
		super(props);

		this.state = {};
	}
	
	render () {
		return (
			<div className="nav-bar">
				<ThemeButton onThemeSwitch={this.props.onThemeSwitch}/>
				<HomeButton/>
				<InfoButton/>
			</div>
		);
	}
};

export default NavBar;
