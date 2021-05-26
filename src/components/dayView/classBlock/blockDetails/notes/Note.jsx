import React, { useState } from 'react'

import { useAuth } from 'contexts/AuthContext';
import { useNotes } from 'contexts/NotesContext';
import { time_ago	} from 'functions';
import RecactNote from './RedactNote';

import { Like, Dislike, LikeFilled, DislikeFilled } from 'iconComponents';


const Note = ({ note, deleteNote }) => {
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
			<p>{note.content}</p>

			<div>
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

				<div className="info">
					<img src={note.authorPhotoURL} alt="profile picture" className="avatar"/>
					{note.authorName} - {time_ago(note.createdAt)}
				</div>
			</div>
		</li>
	)
}

export default Note
