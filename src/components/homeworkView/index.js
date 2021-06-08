import React, { useState, useEffect } from "react"
import { useNotes } from "contexts/NotesContext"
import { useAuth } from "contexts/AuthContext"

import "components/dayView/classBlock/blockDetails/notes/notes.scss"
import "./style.scss"

import HomeworkList from "./HomeworkList"
import CreateNoteButton from "./CreateNoteButton"
import HomeworkCreation from "./HomeworkCreation"

const HomeworkView = () => {
  const [creating, setCreating] = useState()

  const { currentUser } = useAuth()

  const onCreateButtonClicked = (e) => {
    setCreating(true)
  }

  return (
    <div
      className={"homework-page content-box" + (creating ? " creating" : "")}>
      <HomeworkList />

      {currentUser &&
        (creating ? (
          <HomeworkCreation />
        ) : (
          <CreateNoteButton onClick={onCreateButtonClicked} />
        ))}
    </div>
  )
}

export default HomeworkView
