import React, { useRef, useState } from "react"
import "./style.scss"

const ScrollSelector = ({
  options,
  onSelect,
  className,
  placeholder = undefined
}) => {
  const activeRef = useRef() // Reference to the current active option
  const [active, setActive] = useState(placeholder) // Current active option

  return (
    <ul className={"scroll-selector" + (className ? " " + className : "")}>
      {options.map((option) => (
        <li
          key={option}
          ref={option === active ? activeRef : undefined} // Asign ref to this object if it's active
          className={option + (option == active ? " active" : "")} // Asign the "active" class if it's active
          onClick={(e) => {
            e.stopPropagation()

            if (active !== option) {
              // scrooll this element into view after 200 miliseconds
              setTimeout(
                () =>
                  activeRef.current.scrollIntoView({
                    inline: "center",
                    block: "nearest",
                    behavior: "smooth"
                  }),
                200,
                false
              )

              setActive(option)

              // Call the event listener
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
