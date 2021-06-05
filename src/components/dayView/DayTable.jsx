import React, { useState, useEffect } from 'react';
import { useNotes } from 'contexts/NotesContext';
import { useAuth } from 'contexts/AuthContext';
import ClassBlock from "components/dayView/classBlock/ClassBlock";
import TotalTimer from 'components/dayView/classBlock/timers/TotalTimer';

const TimeTable = (props) => {
	const [ tables, setTables ] = useState([]);
	const [ timeRange, setTimeRange ] = useState([]);
	const [ notesSet, setNotesSet ] = useState(false);
	const [ tablesReady, setTablesReady ] = useState(false);

	const [ blockExpanded, setBlockExpanded ] = useState(null);

	const { notes } = useNotes();
	const { users, currentUser } = useAuth();

	const processTables = (data) => {
		return data.tables.map((table, dayIndex) => {
			let blocks = table.classes;
			
			const len = blocks.length-1;
			for(let i = 0; i < len; i++)
				if (blocks[i].end !== blocks[i+1].start)
					blocks.push({
						name: "break",
						start: blocks[i].end,
						end: blocks[i+1].start
					});

			blocks = blocks.map((block, index) => {
				const start = block.start.split(":");
				const end = block.end.split(":");
				return {
					...block,
					teacher: data.teachers[block.name],
					int_start: parseInt(start[0])*60 + parseInt(start[1]),
					int_end: parseInt(end[0])*60 + parseInt(end[1]),
					id: block.name+"s"+block.start+"e"+block.end+"d"+table.name,
					upVoters: [],
					downVoters: [],
					notes: [],
					classIndex: index,
					dayIndex: dayIndex
				};
			});

			// Return blocks sorted by start time 
			return blocks.sort((a, b) => a.int_start - b.int_start);
		});
	};

	useEffect(() => {
		fetch(`/timetable/11g.json`)
		.then(res => res.json())
		.then(data => {
			const tables = processTables(data);
			const today = tables[props.day];
			const int_start = today[0].int_start;
			const int_end = today[today.length-1].int_end;


			setTables(tables)
			setTimeRange([int_start, int_end])
			setTablesReady(true)
		})
	}, [])

	useEffect(() => {
		// Asign votes
		if(currentUser && notesSet) {
			console.log("yeo")
			setTables(
				tables.map(table => 
					table.map(block => {
						block.notes.forEach(note => {
							let currentVote = 0;

							if(note.upVoters.includes(currentUser.uid)) currentVote = 1
							if(note.downVoters.includes(currentUser.uid)) currentVote = 2;

							note.currentVote = currentVote;
						})

						return {...block};
					})
				)
			)
		}
	}, [currentUser, notesSet]);

	useEffect(() => {
		// Set up notes
		if(tablesReady && notes && users) {
			console.log("oui")
			const timeNow = Date.now()
			setTables(
				tables.map((table, dayIndex) => {
					return table.map((block) => {
						const blockNotes = [];
						notes.forEach(note => {
							if(note.day === dayIndex && note.class === block.name)
								blockNotes.push({
									...note,
									currentVote: 0,
									createdAt: note.createdAt !== null ? note.createdAt.seconds * 1000 : timeNow,
									authorName: users[note.author] ? users[note.author].name : "unknown user",
									authorPhotoURL: users[note.author] ? users[note.author].photoURL : ""
								});
						})

						return {...block, notes: blockNotes};
					})
				})
			)
			setNotesSet(true);
		};
	}, [notes, users, tablesReady])
	
	return (
		<div className="content-box">
			<ul className="time-table-timeline">
				{
					tables.length > 0 && tables[props.day].map((block, blockIndex) => 
						<ClassBlock
							key={block.id} 
							blockIndex={blockIndex}
							classData={block}
							isToday={props.today === props.day}
							blockExpanded={blockExpanded}
							setBlockExpanded={setBlockExpanded}/>
					)
				}
				{
					props.today === props.day && timeRange[0] && timeRange[1] &&	
					<TotalTimer
						int_start={timeRange[0]}
						int_end={timeRange[1]}
						shouldUpdate={props.today === props.day}
					/>
				}
			</ul>
		</div>
	);
};

export default TimeTable;
