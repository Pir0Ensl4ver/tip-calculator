import React from "react";

import classes from "./TipCalculatorButton.module.css";

const TipCalculatorButton = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default TipCalculatorButton;
