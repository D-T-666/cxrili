import React from 'react'

const NotesIndicator = ({number, show}) => {
	return number > 0 ? (
		<div className="indicator" style={{opacity: show?1:0, transition:"opacity 200ms", marginRight:".6rem"}}>
			<span>{number}</span>
		</div>
	) : "";
}

export default NotesIndicator
