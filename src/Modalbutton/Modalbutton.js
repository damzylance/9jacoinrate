import React from "react";

function Modalbutton(props) {
  return (
    <>
      <a
        href={props.link}
        className={`modalLink ${props.class && props.class} `}
        onClick={props.action}
      >
        {props.text}
      </a>
    </>
  );
}

export default Modalbutton;
