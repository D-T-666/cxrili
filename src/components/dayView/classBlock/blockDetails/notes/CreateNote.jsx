import React, { useRef } from 'react';
import { usePopup } from 'contexts/PopupContext';

const CreateNote = ({ onSubmit, onCancel }) => {
	const contentRef = useRef();

	const popup = usePopup();

	const suppress = e => {
		e.stopPropagation();
		e.preventDefault();
	}

	const cancelCreate = (e) => {
		onCancel();
		suppress(e);
	}

	const confirmSubmit = (e) => {
		onSubmit(contentRef.current.value);
	}

	const cancelSubmit = (e) => {
		// onCancel();
	}

	const handleSubmit = (e) => {
		popup.setVisible(true);
		popup.setMessage("ყველას შეეძლება შენი დავალების ნახვა. მოდი ერთხელაც გადახედე: \""+contentRef.current.value+"\"");
		popup.setOnConfirm([confirmSubmit]);
		popup.setOnCancel([cancelSubmit]);

		suppress(e);
	}

	return (
		<form className="create" onSubmit={suppress}>
			<textarea ref={contentRef} onClick={suppress} rows={4} />
			<div className="buttons">
				<input type="submit" value="გაუქმება" onClick={cancelCreate} className="red" />
				<input type="submit" value="დამატება" onClick={handleSubmit} className="green" />
			</div>
		</form>
	);
}

export default CreateNote
