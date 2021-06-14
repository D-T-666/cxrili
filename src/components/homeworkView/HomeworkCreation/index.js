import React, { useRef, useState } from "react"
import ScrollSelector from "components/assets/ScrollSelector"

import { useNotes } from "contexts/NotesContext"

const HomeworkCreation = ({ onNoteAdded }) => {
  // Contexts
  const { notes, postNote } = useNotes()

  const classes = {
    მათემატიკა: [0, 1, 3],
    ქართული: [0, 1, 2, 3, 4],
    ქიმია: [0, 2],
    ფიზიკა: [1, 4],
    ბიოლოგია: [2, 3],
    ინგლისური: [0, 4],
    რუსული: [2, 3, 4],
    ისტორია: [0, 1, 2, 4],
    გეოგრაფია: [0, 2]
  }
  const days = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი"]

  // -- Refs ---
  const contentRef = useRef()
  const deadlineRef = useRef()
  const formRef = useRef()

  const [cls, setCls] = useState(undefined)
  const [day, setDay] = useState(undefined)
  const [priority, setPriority] = useState(undefined)

  const suppress = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const onSubmit = (e) => {
    if (cls && day && priority) {
      postNote({
        content: contentRef.current.value,
        class: cls,
        day: day,
        priority: priority,
        deadline: deadlineRef.current.value
      })

      onNoteAdded({ cls, day })
    }
  }

  return (
    <div className='homework-creation'>
      <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
        <textarea
          onClick={suppress}
          rows={8}
          ref={contentRef}
          resizable='false'
        />

        <div className='options'>
          <ul className='titles'>
            <li>გაკვეთილი</li>
            {cls && <li>დღე</li>}
            <li>პრიორიტეტი</li>
            <li>თარიღი</li>
          </ul>

          <ul className='content'>
            <li>
              <ScrollSelector
                className='classes'
                options={Object.keys(classes)}
                onSelect={(o, e) => setCls(o)}
              />
            </li>

            {cls && (
              <li>
                <ScrollSelector
                  className='day'
                  options={classes[cls].map((day) => days[day])}
                  onSelect={(o, e) => setDay(o)}
                />
              </li>
            )}

            <li>
              <ScrollSelector
                className='priorities'
                options={["p1", "p2", "p3", "p4"]}
                onSelect={(o, e) => setPriority(o)}
              />
            </li>

            <li>
              <input
                type='date'
                placeholder='2020-06-06'
                min='2020-06-05'
                max='2020-12-31'
                ref={deadlineRef}
              />
            </li>
          </ul>
        </div>

        <button className='add' onClick={onSubmit}>
          დამატება
        </button>
      </form>
    </div>
  )
}

export default HomeworkCreation