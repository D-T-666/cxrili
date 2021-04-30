import React from 'react';

const AccountOption = ({ Icon, children, color, onClick, className, id }) => (
	<li id={id} className={"account-option "+color+(className?" "+className:"")}>
		<button onClick={onClick}>
			<Icon />
			{children}
		</button>
	</li>
);

export default AccountOption;