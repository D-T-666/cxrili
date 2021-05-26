import React from 'react';

import { Link } from 'react-router-dom';

export const Setting = ({ Icon, children, color, onClick, className, id }) => (
	<li id={id} className={"setting "+color+(className?" "+className:"")}>
		<button onClick={onClick}>
			<Icon />
			{children}
		</button>
	</li>
);

export const LinkSetting = ({ Icon, children, color, onClick, className, id, to }) => (
	<li id={id} className={"setting "+color+(className?" "+className:"")}>
		<Link to={to} onClick={onClick}>
			<Icon />
			{children}
		</Link>
	</li>
);