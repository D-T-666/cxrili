import React, { createContext, useContext, useEffect, useState } from "react"
import firebase from "firebase/app"
import { firestore } from "firebase.js"
import ls from "local-storage"

import { useAuth } from "contexts/AuthContext"
const NotesContext = createContext()

export const useNotes = () => {
  return useContext(NotesContext)
}

export const NotesProvider = ({ children }) => {
  const [storedNotes, _setStoredNotes] = useState(ls.get("notes"))

  const [notes, setNotes] = useState(false)
  const [loading, setLoading] = useState(false)

  const notesRef = firestore.collection("notes")
  const { currentUser } = useAuth()

  const setNoteOption = (noteId, option, data) => {
    _setStoredNotes((old) => {
      if (old[noteId]) {
        old[noteId][option] = data
      } else {
        old[noteId] = []
        old[noteId][option] = data
      }

      ls.set("notes", old)

      return old
    })
  }

  const postNote = async (note) => {
    const data = {
      content: note.content,
      class: note.class,
      day: note.day,
      priority: note.priority,
      deadline: note.deadline,
      author: currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      upVoters: [currentUser.uid],
      downVoters: []
    }

    console.log("posting", data)

    await notesRef.add(data)
  }

  const deleteNote = async (id) => {
    await notesRef.doc(id).delete()
  }

  const upVoteNote = async (id) => {
    await notesRef.doc(id).update({
      upVoters: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
    })
  }

  const upVoteNoteCancel = async (id) => {
    await notesRef.doc(id).update({
      upVoters: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
    })
  }

  const downVoteNote = async (id) => {
    await notesRef.doc(id).update({
      downVoters: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
    })
  }

  const downVoteNoteCancel = async (id) => {
    await notesRef.doc(id).update({
      downVoters: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
    })
  }

  const setCurrentVote = async (id, vote) => {
    if (vote === 1)
      await notesRef.doc(id).update({
        upVoters: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
        downVoters: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
      })
    if (vote === 2)
      await notesRef.doc(id).update({
        upVoters: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
        downVoters: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
      })
    if (vote === 0)
      await notesRef.doc(id).update({
        upVoters: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
        downVoters: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
      })
  }

  useEffect(() => {
    if (storedNotes === null) {
      _setStoredNotes({})
      ls.set("notes", {})
    }
    setLoading(true)
    notesRef.onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id })
      })
      setNotes(items)
      setLoading(false)
    })
  }, [])

  const value = {
    notes,
    loading,
    postNote,
    deleteNote,
    upVoteNote,
    upVoteNoteCancel,
    downVoteNote,
    downVoteNoteCancel,
    setCurrentVote,
    storedNotes,
    setNoteOption
  }

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
}
