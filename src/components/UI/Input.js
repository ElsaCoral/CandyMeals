import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  if (props.inpActions) {
    const { inpVal, setInpVal } = props.inpActions;
    const onAddHandler = () => {
      setInpVal((prev) => {
        if (prev === 5) return prev;
        return prev + 1;
      });
    };
    const onRemoveHandler = () => {
      setInpVal((prev) => {
        if (prev === 1) return prev;
        return prev - 1;
      });
    };

    return (
      <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input} value={inpVal} readOnly />
        <button
          className={classes.actions}
          type="button"
          onClick={onRemoveHandler}
        >
          −
        </button>
        <button
          className={classes.actions}
          type="button"
          onClick={onAddHandler}
        >
          +
        </button>
      </div>
    );
  } else {
    return (
      <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input} />
      </div>
    );
  }
});

export default Input;
