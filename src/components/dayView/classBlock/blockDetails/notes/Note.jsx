import React, { useState } from 'react';

import { useAuth } from 'contexts/AuthContext';
import { useNotes } from 'contexts/NotesContext';
import { time_ago	} from 'utils';
import RecactNote from './RedactNote';

import { Like, Dislike, LikeFilled, DislikeFilled } from 'iconComponents';

const Checkbox = ({note, id, children}) => {
	const { storedNotes, setNoteOption } = useNotes();
	const [ checked, setChecked ] = useState(storedNotes[note] ? storedNotes[note][id] : false);

	const handleClick = (e) => {
		e.stopPropagation();

		setChecked(old => !old);

		setNoteOption(note, id, !checked);
	};

	return (
		<div onClick={handleClick} className={"list-item" + (checked ? " checked" : "")} style={{display:"flex"}}>
			<div className="checkbox"> </div>
			{children}
		</div>
	);
};

const Note = ({ note, deleteNote, showButtons=true }) => {
	const [vote, setVote] = useState(note.currentVote);

	const { currentUser } = useAuth();
	const { setCurrentVote } = useNotes();

	const suppress = (f, ...rest) => {
		return (e) => {
			f(...rest);
			e.stopPropagation();
		};
	};

	const handleVote = (id) => {
		const new_vote = vote === id ? 0 : id;
		setCurrentVote(note.id, new_vote);
		setVote(new_vote);
	}

	// TODO:
	const handleEdit = () => {}

	const handleDelete = () => {
		deleteNote(note.id);
	}

	return (
		<li className="note">
			<div className="info">
				<img src={note.authorPhotoURL} alt="profile picture" className="avatar"/>
				{note.authorName} <span className="date">{time_ago(note.createdAt)}</span>
			</div>

			<div className="content">
				<ul>
					{note.content.split("\n").map((s, i) => (
						<>
							{
								s.startsWith("-")
									?	<li key={note.id+`${i}`}>
											<Checkbox note={note.id} id={i}>{s.substring(1)}</Checkbox>
										</li>
									:	<p key={note.id+`${i}`}>
											{s}
										</p>
							}
						</>
					))}
				</ul>
			</div>

			{showButtons && <div className="buttons">
				<div className="votes">
					<button 
						disabled={ !currentUser } 
						className={ (vote === 1) ? "green" : "" } 
						onClick={ suppress(handleVote, 1) }>
						{ vote === 1 ? <LikeFilled /> : <Like /> }
						{note.upVoters.length}
					</button>
					<button 
						disabled={ !currentUser } 
						className={ (vote === 2) ? "red" : "" }
						onClick={ suppress(handleVote, 2) }>
						{ vote === 2 ? <DislikeFilled /> : <Dislike /> } 
						{note.downVoters.length}
					</button>
				</div>
				{
					currentUser && (
						currentUser.uid === note.author && (
							<RecactNote onDelete={handleDelete} onEdit={handleEdit} />
						)
					)
				}

			</div>}
		</li>
	)
}

export default Note
