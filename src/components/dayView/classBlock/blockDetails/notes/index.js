import React, { useState, useEffect } from 'react'

import { useNotes } from 'contexts/NotesContext';
import { useAuth } from 'contexts/AuthContext';

import Note from './Note';
import CreateNote from './CreateNote';
import Buttons from './Buttons';

import './notes.scss';

const Notes = ({blockData, parentExpanded}) => {
	const [expanded, setExpanded] = useState(blockData.notes.length <= 1);
	const [creating, setCreating] = useState(false);
	const [visible, setVisible] = useState(parentExpanded);

	useEffect(() => {
		if(parentExpanded)
			setVisible(parentExpanded)
		else
			setTimeout(() => setVisible(parentExpanded), 150, false)
	}, [parentExpanded])

	const { loading, postNote, deleteNote } = useNotes();
	const { currentUser, usersLoading } = useAuth();

	const handleExpand = e => {
		setExpanded(o => !o);

		e.stopPropagation();
	};

	const handelAdd = e => {
		setCreating(o => !o);

		e.stopPropagation();
	};

	const onSubmit = content => {
		const data = {
			content: content,
			day: blockData.dayIndex,
			class: blockData.classIndex
		};
		// console.log(blockData);
		postNote(data);
		setCreating(false);
	};

	const onCancel = e => setCreating(false);

	const onDeleteNote = (noteId) => deleteNote(noteId);

	return (
		<>
			{((!loading && currentUser) || (blockData.notes.length > 0)) && visible &&
				<div className={"notes"+(parentExpanded?" expanded":"")+(blockData.notes.length>0?" multiple":" empty")}>
					{
						!loading && !usersLoading
						? <>
								{ blockData.notes.length > 0
									? <>
											<h1 style={{fontFamily: "myFont"}}>საშინაო დავალება</h1>
											<ul className={"list"+(expanded?" expanded":"")}>
												<Note note={blockData.notes[0]} key={blockData.notes[0].id} deleteNote={onDeleteNote} blockData={blockData} />
												{
													expanded
													&& blockData.notes
														.map((note, index) => 
															index > 0 && <Note note={note} key={note.id} deleteNote={onDeleteNote} blockData={blockData} />
														)
												}
											</ul>
										</>
									: (currentUser && <h1 style={{fontFamily: "myFont"}}>საშინაო დავალება</h1>)
								}
								{!creating
									? <Buttons notes={blockData.notes} onAdd={handelAdd} onExpand={handleExpand} expanded={expanded} />
									: (currentUser && <CreateNote onSubmit={onSubmit} onCancel={onCancel} />)
								}
							</>
						: <>
								<h1 style={{fontFamily: "myFont"}}>საშინაო დავალება</h1>
								<h3 style={{fontFamily: "myFont"}}>იტვირთება...</h3>
							</>
					}
				</div>
			}
		</>
	)
};

export default Notes;
