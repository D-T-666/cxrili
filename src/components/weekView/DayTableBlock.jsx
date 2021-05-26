import React from 'react';
import { Link } from 'react-router-dom';

const DayTableBlock = ({isToday, day, name, classes}) => (
	<Link to={`/day/${day}`} className={"day-table-block"+(isToday?" today":"")}>
		<h1 className="title">{name}</h1>
		<ul>
			{classes.map(entry => 
				<li key={day+entry.name}>{entry.name}</li>
			)}
		</ul>
	</Link>
);

export default DayTableBlock;