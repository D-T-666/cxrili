import React from 'react'

import { useAuth } from 'contexts/AuthContext';
import { More, Less, PlusIcon } from 'iconComponents';

const Buttons = ({ onAdd, onExpand, expanded, notes }) => {
	const { currentUser } = useAuth();

	return (
		( notes.length > 1 || currentUser !== null ) &&
		<ul className="buttons">
			{currentUser!==null && <button onClick={onAdd}><PlusIcon />დამატება</button>}
			{
				notes.length > 1
					? <button onClick={onExpand}>
							{ 
								!expanded
									? <>
											<span style={{fontWeight:"900"}}><span style={{fontSize:"1.1rem",fontFamily:"numFont"}}>+{notes.length-1}</span></span>
											<More />
										</>
									: <><Less /></>
							}
						</button>
					: ""
			}
		</ul>
	)
}

export default Buttons