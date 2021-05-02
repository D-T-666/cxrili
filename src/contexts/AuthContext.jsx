import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, GoogleProvider } from 'firebase.js';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState('');

	const signupGoogle = () => auth.signInWithPopup(GoogleProvider);
	const signout = () => auth.signOut();
	const editProfile = (displayName, photoURL) => currentUser.updateProfile({displayName, photoURL});

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
		})

		return unsubscribe
	}, [])

	const value = {
		currentUser,
		signupGoogle,
		signout,
		editProfile
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}