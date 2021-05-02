import React from 'react';

import { BackArrow } from 'iconComponents';

const BackButton = () => (
	<button className="back-button" onClick={
		() => window.history.back()
	}>
		<BackArrow />
	</button>
)

export default BackButton;