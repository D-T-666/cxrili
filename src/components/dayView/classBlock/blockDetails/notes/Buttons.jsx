import React from 'react'

import { useAuth } from 'contexts/AuthContext';
import { More, Less, PlusIcon } from 'iconComponents';

const Buttons = ({ onAdd, onExpand, expanded, notes }) => {
	const { currentUser } = useAuth();

	return (
		( notes.length > 1 || currentUser !== null ) &&
		<ul className="buttons">
			{
				notes.length > 1
					? <button onClick={onExpand}>
							{ 
								!expanded
									? <><More /><span style={{fontWeight:"900"}}>კიდევ <span style={{fontSize:"0.9rem",fontFamily:"numFont"}}>{notes.length-1}</span></span></>
									: <><Less />ნაკლები</>
							}
						</button>
					: ""
			}
			{currentUser!==null && <button onClick={onAdd} className="green"><PlusIcon />დამატება</button>}
		</ul>
	)
}

export default Buttons