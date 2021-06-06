import React from 'react'

import { PlusIcon } from 'iconComponents'

const CreateNoteButton = ({onClick, show=true}) => {
    return show && (
        <div className="create-note">
            <div onClick={e => {e.stopPropagation();onClick(e)}} >
                <PlusIcon />
            </div>
        </div>
    )
}

export default CreateNoteButton
