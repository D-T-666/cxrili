import React from 'react';
import { Link } from 'react-router-dom';

const DayButton = ({name, className, onClick, children}) =>
	<Link to={`/${name}`}>
		<button onClick={() => onClick(name)} 
						className={className}>
			{children}
		</button>
	</Link>;

export default DayButton