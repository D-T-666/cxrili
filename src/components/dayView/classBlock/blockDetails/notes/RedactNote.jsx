import React from 'react';
import { usePopup } from 'contexts/PopupContext';
import { Delete, /* Edit */ } from 'iconComponents';

function RedactNote({onDelete, onEdit}) {
	const popup = usePopup();

	const handleDelete = () => {
		popup.setVisible(true);
		popup.setMessage("ნამდვილად გსურს საშინაო დავალების წაშლა?");
		popup.setOnConfirm([onDelete]);
		popup.setOnCancel([() => {}]);
	}

	const suppress = (f, ...rest) => {
		return (e) => {
			f(...rest);
			e.stopPropagation();
		};
	};

	return (
		<div className="modify">
			{/* <button onClick={handleEdit}>
				<Edit /> შეცვლა
			</button> */}
			<button onClick={ suppress(handleDelete) } className="red">
				<Delete />
			</button>
		</div>
	)
}

export default RedactNote
