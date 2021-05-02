import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import ls from 'local-storage'

import { Confirm } from 'components/popup';

import { Setting } from 'components/settings/Setting';

import { LogOut, Edit, SelectColor, Profile, Done, LightMode, DarkMode } from 'iconComponents';

const ProfilePage = ({switchTheme}) => {
	const [NameEdit, setNameEdit] = useState(true);


	const { currentUser, signout, editProfile } = useAuth();
	const [currentDisplayName, setCurrentDisplayName] = useState(currentUser.displayName || currentUser.email)
	const userName = useRef();
	const photoURL = currentUser.photoURL;
	const [colorTheme, setColorTheme] = useState(ls.get('colorTheme') || 'light');

	useEffect(() => {
		userName.current.value = currentDisplayName;
	}, []);

	const [nameEditPopupVisible, setNameEditPopupVisible] = useState(false);
	const [logOutPopupVisible, setLogOutPopupVisible] = useState(false);

	const confirmNameEdit = () => {
		// alert("ge")
		editProfile(userName.current.value, photoURL);
		setCurrentDisplayName(userName.current.value);
		setNameEditPopupVisible(false);
	}

	const editName = () => {
		if(!NameEdit){
			if(userName.current.value !== currentDisplayName){
				setNameEditPopupVisible(true);
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

	const handleSignOut = () => {
		setLogOutPopupVisible(false);
		signout();
	}

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
					>
						{NameEdit ? "სახელის შეცვლა" : "შენახვა" } </Setting>

					{/* <Setting
						Icon={SelectColor}
					>
						ფერის შეცვლა </Setting> */}

					<Setting
						Icon={colorTheme==="dark"?DarkMode:LightMode}
						onClick={changeTheme}
					>
						{colorTheme==="dark"?"ღამის რეჟიმი":"დღის რეჟიმი"} </Setting>

					<Setting
						Icon={LogOut}
						color="red"
						onClick={()=>setLogOutPopupVisible(true)}
					>
						გამოსვლა </Setting>
				</ul>
			</div>

			<Confirm 
				visible={nameEditPopupVisible}
				prompt={"ახალი სახელი: " + (nameEditPopupVisible?userName.current.value:"")}
				onConfirm={confirmNameEdit}
				onCancel={() => {userName.current.value = currentDisplayName; setNameEditPopupVisible(false)}} />

			<Confirm 
				visible={logOutPopupVisible}
				prompt={"ანგარიშიდან გამოსვლა"}
				onConfirm={handleSignOut}
				onCancel={() => {setLogOutPopupVisible(false)}} />

		</>
	)
};

export default ProfilePage;