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
          ref={option === active ? activeRef : undefined} // Assign ref to this object if it's active
          className={option + (option == active ? " active" : "")} // Assign the "active" class if it's active
          onClick={(e) => {
            e.stopPropagation()

            if (active !== option) {
              // scroll this element into view after 200 milliseconds
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
              onSelect(option, options.indexOf(option), e)
            }
          }}>
          <span>{option}</span>
        </li>
      ))}
    </ul>
  )
}

export default ScrollSelector
