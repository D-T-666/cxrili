import React, { Component } from 'react';
import NavButton from 'components/navbar/NavButton';
import 'css/navbar/navbar.css';
import ThemeButton from 'components/navbar/ThemeButton';

import week from 'iconComponents/Week';
import day from 'iconComponents/Day';
import profile from 'iconComponents/Profile';

class NavBar extends Component{
	constructor (props) {
		super(props);

		this.state = {
			currentPage: this.props.match.params.page
		};
	}
	
	render() {
		return (
			<ul className="nav-bar">
				<NavButton 
					active={this.props.match.params.page === "day"} 
					icon={day}
					to="/day">
					დღე
				</NavButton>

				<NavButton 
					active={this.props.match.params.page === "week"} 
					icon={week}
					to="/week">
					კვირა
				</NavButton>

				<NavButton 
					active={this.props.match.params.page === "profile"} 
					icon={profile}
					to="/profile">
					პროფილი
				</NavButton>

				<ThemeButton onThemeSwitch={this.props.onThemeSwitch}></ThemeButton>
			</ul>
		);
	}
};

export default NavBar;
