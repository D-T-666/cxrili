import * as React from "react";

function SvgEdit(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      fill="#FFF"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M15 16l-4 4h10v-4zM12.06 7.19L3 16.25V20h3.75l9.06-9.06-3.75-3.75zM5.92 18H5v-.92l7.06-7.06.92.92L5.92 18zM18.71 8.04a.996.996 0 000-1.41l-2.34-2.34a1.001 1.001 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}

export default SvgEdit;
