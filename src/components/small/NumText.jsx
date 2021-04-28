import { Component } from 'react';
 
let NumText = ({children}) => (
	<span style={{fontFamily: "numFont"}}>
		{children}
	</span>
);

export default NumText;