import React from "react"
import Note from "components/dayView/classBlock/blockDetails/notes/Note"

const DaySection = ({ cls, days }) => {
  const daynames = [
    "ორშაბათი",
    "სამშაბათი",
    "ოთხშაბათი",
    "ხუთშაბათი",
    "პარასკევი"
  ]

  return (
    <section className={"day-section " + cls}>
      <h3>{isNaN(cls) ? cls : daynames[cls]}</h3>
      <div className='list'>
        {days[cls].map((note) => (
          <Note note={note} key={note.id} showButtons={false} />
        ))}
      </div>
    </section>
  )
}

export default DaySection
