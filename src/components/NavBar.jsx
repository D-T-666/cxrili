import React, { Component } from 'react';
import Button from "./buttons/Button";
import ThemeButton from "./buttons/ThemeButton";
import HomeButton from "./buttons/HomeButton";
import InfoButton from "./buttons/InfoButton";

class NavBar extends Component{
	constructor (props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {}

	componentWillUnmount() {}
	
	render () {
		return (
			<div className="nav-bar">
				<ThemeButton onThemeSwitch={this.props.onThemeSwitch}/>
				<HomeButton/>
				<Button className="nogrow">🏠</Button>
				<InfoButton/>
			</div>
		);
	}
};

export default NavBar;
