import React, { Component } from 'react';
import NavButton from 'components/navbar/NavButton';
import 'css/navbar/navbar.css';
import ThemeButton from 'components/navbar/ThemeButton';

import { Week, WeekFilled, Day, DayFilled, Settings, SettingsFilled } from 'iconComponents';

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
					icon={this.props.match.params.page === "day"?DayFilled:Day}
					to="/day">
					დღე
				</NavButton>

				<NavButton 
					active={this.props.match.params.page === "week"} 
					icon={this.props.match.params.page === "week"?WeekFilled:Week}
					to="/week">
					კვირა
				</NavButton>

				<NavButton 
					active={this.props.match.params.page === "settings"} 
					icon={this.props.match.params.page === "settings"?SettingsFilled:Settings}
					to="/settings">
					პარამეტრები
				</NavButton>

				{/* <ThemeButton onThemeSwitch={this.props.onThemeSwitch}></ThemeButton> */}
			</ul>
		);
	}
};

export default NavBar;
