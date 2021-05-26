import React, { useEffect, useState } from 'react';
import 'css/weekview.scss';
import DayTableBlock from "components/weekView/DayTableBlock.jsx";

const WeekTable = ({ today }) => {
	const [tables, setTables] = useState([]);

	useEffect(() => {
		fetch(`/timetable/11g.json`)
			.then(res => res.json())
			.then(wholeTable => setTables(wholeTable.tables))
	}, []);

	return (
		<div className="week-table content-box">
			{tables.map((table, index) => 
				<DayTableBlock
					key={String(index)+table.name}
					day={index}
					name={table.name}
					classes={table.classes} 
					isToday={today === index}/>
			)}
		</div>
	)
}

export default WeekTable;
