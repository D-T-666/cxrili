import React from 'react'

import './popup.scss';

export const Popup = ({ visible, children, className }) => {
	const getClassName = () => {
		return className?("popup " + className) : "popup"
	}

	return (
		visible 
		?	<div className={getClassName()}>
				<div className="content">
					{children}
				</div>
			</div>
		: ""
	)
};

export const Confirm = ({ visible, prompt, onConfirm, onCancel }) => {
	return (
		<Popup visible={visible} className="confirm">
			<h2>
				დარწმუნებული ხარ?
			</h2>
			<h4 className="prompt">
				{prompt}
			</h4>
			<button className="yes" onClick={onConfirm}>
				კი
			</button>
			<button className="no" onClick={onCancel}>
				არა
			</button>
		</Popup>
	)
};

// export default Popup
