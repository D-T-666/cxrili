import React from 'react';
import NavButton from 'components/navbar/NavButton';
import 'css/navbar/navbar.scss';

import { Day, DayFilled, Week, WeekFilled, Homework, HomeworkFilled, Settings, SettingsFilled } from 'iconComponents';

const NavBar = ({match}) => (
	<ul className="nav-bar">
		<NavButton 
			active={match.params.page === "day"} 
			icon={match.params.page === "day"?DayFilled:Day}
			to="/day">
			დღე
		</NavButton>

		<NavButton 
			active={match.params.page === "week"} 
			icon={match.params.page === "week"?WeekFilled:Week}
			to="/week">
			კვირა
		</NavButton>
		
		<NavButton 
			active={match.params.page === "homework"} 
			icon={match.params.page === "homework"?HomeworkFilled:Homework}
			to="/homework">
			დავალება
		</NavButton>

		<NavButton 
			active={match.params.page === "settings"} 
			icon={match.params.page === "settings"?SettingsFilled:Settings}
			to="/settings">
			პარამეტრები
		</NavButton>
	</ul>
);

export default NavBar;
