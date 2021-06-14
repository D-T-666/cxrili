import React, { useState } from "react"
import { useAuth } from "contexts/AuthContext"

import "components/dayView/classBlock/blockDetails/notes/notes.scss"
import "./style.scss"

import HomeworkList from "./HomeworkList"
import CreateNoteButton from "./CreateNoteButton"
import HomeworkCreation from "./HomeworkCreation"

const HomeworkView = () => {
  const [creating, setCreating] = useState()
  const [currentAttention, setCurrentAttention] = useState({
    cls: undefined,
    day: undefined
  })

  const { currentUser } = useAuth()

  const onCreateButtonClicked = (e) => {
    setCreating(true)
  }

  const onNoteAdded = (e) => {
    setCreating(false)
    setCurrentAttention(e)
  }

  return (
    <div
      className={"homework-page content-box" + (creating ? " creating" : "")}>
      <HomeworkList attention={currentAttention} />

      {currentUser &&
        (creating ? (
          <HomeworkCreation onNoteAdded={onNoteAdded} />
        ) : (
          <CreateNoteButton onClick={onCreateButtonClicked} />
        ))}
    </div>
  )
}

export default HomeworkView
