import React, { useState } from "react"
import "./style.scss"

const ScrollSelector = ({ options, onSelect, className, style }) => {
  const [active, setActive] = useState(options[0])

  return (
    <ul className={"scroll-selector" + (className ? " " + className : "")}>
      {options.map((option) => (
        <li
          style={style ? style : {}}
          className={option + (option == active ? " active" : "")}
          onClick={(e) => {
            e.stopPropagation()
            if (active !== option) {
              setActive(option)
              onSelect(option, e)
            }
          }}>
          <span>{option}</span>
        </li>
      ))}
    </ul>
  )
}

export default ScrollSelector
