import React, { createContext, useContext, useState } from 'react';

const PopupContext = createContext();

export const usePopup = () => {
	return useContext(PopupContext);
}

export const PopupProvider = ({ children }) => {
	const [visible, setVisible] = useState(false);
	const [message, setMessage] = useState("");
	const [onConfirm, setOnConfirm] = useState([_ => _])
	const [onCancel, setOnCancel] = useState([_ => _])

	// useEffect(() => {}, [])

	const value = {
		visible,
		setVisible,
		message,
		setMessage,
		onConfirm,
		setOnConfirm,
		onCancel,
		setOnCancel
	};

	return (
		<PopupContext.Provider value={value}>
			{children}
		</PopupContext.Provider>
	)
}