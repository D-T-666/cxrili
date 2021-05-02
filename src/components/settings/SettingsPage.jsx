import React, { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import 'css/settings/settings.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProfilePage from 'components/settings/profile/ProfilePage';
import LoginPage from 'components/settings/login/LoginPage';
import SignupPage from 'components/settings/login/SignupPage';

import BackButton from 'components/settings/BackButton';

import { Setting } from 'components/settings/Setting';
import { GoogleIcon } from 'iconComponents';

const SettingsPage = ({switchTheme}) => {
	const { signupGoogle, currentUser } = useAuth();

	return (
		<Router basename="/settings">
			<BackButton />
			<Switch>
				<Route path="/" exact>
					{
						currentUser
						? <ProfilePage switchTheme={switchTheme} />
						: <div className="settings content-box">
							<ul className="">
								<Setting
									onClick={signupGoogle}
									Icon={GoogleIcon}
									className="small"
								> <span style={{fontFamily: "monospace"}}>Google</span>-ით შესვლა </Setting>
							</ul>
						</div>
					}
				</Route>

				<Route path="/login" component={LoginPage} />
				<Route path="/signup" component={SignupPage} />
			</Switch>

		</Router>
	)
};

export default SettingsPage;