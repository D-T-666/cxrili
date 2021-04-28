import React from 'react';
import { Link } from 'react-router-dom';

const DayButton = ({name, className, onClick, children}) => (
	<li>
		<Link to={`/${name}`} onClick={() => onClick(name)} 
							className={className}>
				{children}
		</Link>
	</li>
);

export default DayButton