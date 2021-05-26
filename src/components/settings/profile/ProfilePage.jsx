import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { usePopup } from 'contexts/PopupContext';
import ls from 'local-storage'

import { Setting } from 'components/settings/Setting';

import { LogOut, Edit, Profile, Done, LightMode, DarkMode } from 'iconComponents';

const ProfilePage = ({switchTheme}) => {
	const [NameEdit, setNameEdit] = useState(true);

	const popup = usePopup(); 

	const { currentUser, signout, editProfile } = useAuth();
	const [currentDisplayName, setCurrentDisplayName] = useState(currentUser.displayName || currentUser.email)
	const userName = useRef();
	const photoURL = currentUser.photoURL;
	const [colorTheme, setColorTheme] = useState(ls.get('colorTheme') || 'light');

	useEffect(() => {
		userName.current.value = currentDisplayName;
	}, [currentDisplayName]);

	const confirmNameEdit = () => {
		editProfile(userName.current.value, photoURL);
		setCurrentDisplayName(userName.current.value);
	}

	const cancelNameEdit = () => {
		userName.current.value = currentDisplayName;
	}

	const editName = () => {
		if(!NameEdit){
			if(userName.current.value !== currentDisplayName){
				popup.setVisible(true);
				popup.setMessage("ახალი სახელი: "+userName.current.value);
				popup.setOnConfirm([confirmNameEdit]);
				popup.setOnCancel([cancelNameEdit]);
			}
		}
		
		setNameEdit(old => !old)
	};

	const changeTheme = () => {
		setColorTheme(old => {
			const newTheme = (old === "dark") ? "light" : "dark";
			ls.set('colorTheme', newTheme);
			switchTheme(newTheme);
			return newTheme;
		})
	};

	const confirmSignOut = () => {signout()};

	const cancelSignOut = () => {};

	const handleSignOut = () => {
		popup.setVisible(true);
		popup.setMessage("ანგარიშიდან გამოსვლა");
		popup.setOnConfirm([confirmSignOut]);
		popup.setOnCancel([cancelSignOut]);
	};

	return (
		<>
			<div className="content-box settings">
				{
					photoURL
					?
						<img src={photoURL} alt="user profile" className="picture" />
					:
						<Profile className="picture" />
				}
				<input className="name" ref={userName} disabled={NameEdit} />
				<hr />

				<ul>
					<Setting
						Icon={NameEdit?Edit:Done} 
						onClick={editName} 
						id="name-edit"
						className={!NameEdit?"active":""}
					> {NameEdit ? "სახელის შეცვლა" : "შენახვა" } </Setting>

					<Setting
						Icon={colorTheme==="dark"?DarkMode:LightMode}
						onClick={changeTheme}
					> {colorTheme==="dark"?"ღამის რეჟიმი":"დღის რეჟიმი"} </Setting>

					<Setting
						Icon={LogOut}
						color="red"
						onClick={handleSignOut}
					> გამოსვლა </Setting>
				</ul>
			</div>
		</>
	)
};

export default ProfilePage;