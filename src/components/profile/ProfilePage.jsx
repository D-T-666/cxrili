import React, { useState } from 'react';
import 'css/profile/profile.scss';
import ls from 'local-storage'

import AccountOption from 'components/profile/AccountOption';

import { LogOut, Delete, Edit, SelectColor, Profile, Done, Cancel } from 'iconComponents';


const ProfilePage = ({match}) => {
	const [NameEdit, setNameEdit] = useState(true);

	const [currentUserName, setCurrentUserName] = useState(ls.get('userName'));
	const [userName, setUserName] = useState(currentUserName);
	const profilePictureURL = undefined;

	const handleNameFieldChanged = (e) => {
		setUserName(e.target.value);
	}

	const editName = () => {
		if(!NameEdit){
			if(window.confirm("დარწმუნებული ხარ?")){
				alert("სახელი შეცვლილია!");
				setCurrentUserName(userName);
				ls.set('userName', userName)
				console.log(currentUserName)
			} else {
				setUserName(currentUserName);
			}
		}
		
		setNameEdit(old => !old)
	};

	return (
		<div className="content-box profile">
			{
				profilePictureURL
				?
					<img src={profilePictureURL} alt="user profile" className="picture" />
				:
					<Profile className="picture" />
			}
			<input className="name" value={userName} onChange={handleNameFieldChanged} autoFocus disabled={NameEdit} />
			<hr />

			<ul>
				<AccountOption
					Icon={NameEdit?Edit:Done} 
					onClick={editName} 
					id="name-edit"
					className={!NameEdit?"active":""}
				>
					{NameEdit ? "სახელის შეცვლა" : "შენახვა" } </AccountOption>

				<AccountOption
					Icon={SelectColor}
				>
					ფერის შეცვლა </AccountOption>

				<AccountOption
					Icon={LogOut}
				>
					გამოსვლა </AccountOption>

				<AccountOption
					Icon={Delete}
					color="red"
				>
					გასუფთავება	</AccountOption>
			</ul>
		</div>
	)
};

export default ProfilePage;