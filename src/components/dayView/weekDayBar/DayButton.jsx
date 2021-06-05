import React, {useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';

const DayButton = ({name, className, onClick, active, children}) => {
	const me = useRef();

	useEffect(() => {
		if(active) setTimeout(() => me.current.scrollIntoView({behavior: "smooth", inline: "center"}), 1200, false);
	});

	return (
		<li ref={me}>
			<Link to={`/${name}`} onClick={() => onClick(name)} 
								className={className}>
					{children}
			</Link>
		</li>
	)
};

export default DayButton