import { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [inpVal, setInpVal] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const inpActions = { inpVal, setInpVal };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
    setInpVal(1);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Cantidad"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
        }}
        inpActions={inpActions}
      />
      <button>+ Agregar</button>
      {!amountIsValid && <p>Porfavor ingrese una cantidad valida! (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
