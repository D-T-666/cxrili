import React, { useState, useEffect } from 'react';
import { useNotes } from 'contexts/NotesContext';
import { useAuth } from 'contexts/AuthContext';

import 'components/dayView/classBlock/blockDetails/notes/notes.scss';
import './style.scss';

import ClassSection from './ClassSection.jsx';

const HomeworkView = () => {
	const [ notesSorted, setNotesSorted ] = useState({});
	const [ blockExpanded, setBlockExpanded ] = useState(null);

	const { notes } = useNotes();
	const { users, currentUser } = useAuth();

	useEffect(() => {
		// Sort Notes

		let sorted = {};

		for(let i = 0; i < notes.length; i++){
			const note = notes[i];

			if(sorted[note.class] === undefined)
				sorted[note.class] = {number: 0};
			
			sorted[note.class].number += 1;

			if(sorted[note.class][note.day] === undefined)
				sorted[note.class][note.day] = [];

			let currentVote = 0;

			if(note.upVoters.includes(currentUser.uid)) currentVote = 1
			if(note.downVoters.includes(currentUser.uid)) currentVote = 2;

			sorted[note.class][note.day].push(users[note.author] ? {
				...note,
				authorPhotoURL: users[note.author].photoURL,
				authorName: users[note.author].name,
				createdAt: note.createdAt !== null ? note.createdAt.seconds * 1000 : Date.now(),
				currentVote: currentVote
			} : note);
		}

		setNotesSorted(sorted);

	}, [notes, users])

	return (
		<div className="homework-page content-box">
			{
				Object.keys(notesSorted).map((cls, ind) => (
					<ClassSection
						days={notesSorted[cls]} 
						cls={cls} 
						parentBlockExpanded={blockExpanded}
						setParentBlockExpanded={setBlockExpanded}
						key={cls+ind+"classSection"}/>
				))
			}
		</div>
	)
};

export default HomeworkView;
