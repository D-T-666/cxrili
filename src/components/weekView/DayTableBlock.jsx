import React from 'react';
import { Link } from 'react-router-dom';

const DayTableBlock = ({isToday, day, name, table}) =>
	<Link to={`/day/${day}`} className={"day-table-block"+(isToday?" today":"")}>
		<h1 className="title">{name}</h1>
		<ul>
			{table.map(entry => 
				<li key={day+entry}>{entry}</li>
			)}
		</ul>
	</Link>

export default DayTableBlock;