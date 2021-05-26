import React from 'react'

import { usePopup } from 'contexts/PopupContext';

import './popup.scss';

export const Popup = ({ visible, children, className }) => {
	const getClassName = () => {
		return className?("popup " + className) : "popup"
	}

	return visible &&
		<div className={getClassName()}>
			<div className="content">
				{children}
			</div>
		</div>;
};

export const Confirm = () => {
	const { visible, setVisible, message, onConfirm, onCancel } = usePopup(); 

	const handleConfirm = () => {
		onConfirm[0]();
		setVisible(false);
	}

	const handleCancel = () => {
		onCancel[0]();
		setVisible(false);
	}

	return (
		<Popup visible={visible} className="confirm">
			<h2>
				დარწმუნებული ხარ?
			</h2>
			<h4 className="prompt">
				{message}
			</h4>
			<button className="yes" onClick={handleConfirm}>
				კი
			</button>
			<button className="no" onClick={handleCancel}>
				არა
			</button>
		</Popup>
	)
};

// export default Popup
