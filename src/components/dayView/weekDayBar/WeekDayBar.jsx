import React from "react"
import DayButton from "./DayButton"
import "css/dayView/week-day-bar/week-day-bar.scss"
import ScrollSelector from "components/assets/ScrollSelector"

const WeekDayBar = ({ onDayChange, day }) => {
  const dayNames = [
    "ორშაბათი",
    "სამშაბათი",
    "ოთხშაბათი",
    "ხუთშაბათი",
    "პარასკევი"
  ]

  return (
    <ScrollSelector
      options={dayNames}
      onSelect={onDayChange}
      placeholder={dayNames[day]}
      className='week-day-bar'
    />
  )
}

export default WeekDayBar
