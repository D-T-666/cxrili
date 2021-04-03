import React from 'react';

const Button = ({className, children}) => 
	<button className={(className ? className+" ": "")}>
		{children}
	</button>;

export default Button