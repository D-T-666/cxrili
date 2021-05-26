import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, GoogleProvider } from 'firebase.js';
import { firestore } from 'firebase.js';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState('');
	const [usersLoading, setLoading] = useState(false);
	const [users, setUsers] = useState({});

	const ref = firestore.collection('users');

	const signupGoogle = () => auth.signInWithPopup(GoogleProvider);
	
	const signout = () => auth.signOut();

	const editProfile = (displayName, photoURL) => {
		currentUser.updateProfile({ displayName, photoURL })

		ref.doc(currentUser.uid).set({
			name: displayName,
			photoURL: photoURL
		})
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);

			if(user)
				ref.doc(user.uid).set({
					name: user.displayName,
					photoURL: user.photoURL,
					email: user.email
				})
		})

		ref.onSnapshot((querySnapshot) => {
			const items = {};
			querySnapshot.forEach(doc => {
				items[doc.id] = doc.data();
			})
			
			setUsers(items);
			setLoading(false);
		})

		return unsubscribe
	}, [])

	const value = {
		currentUser,
		signupGoogle,
		signout,
		editProfile,
		users,
		usersLoading
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}