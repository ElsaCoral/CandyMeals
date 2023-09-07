import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;
const onlyNum = (value) => /^\d+$/.test(value);

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid =
      isFiveChars(enteredPostal) && onlyNum(enteredPostal);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostal,
    });
  };

  const nameControlClasses = `${classes.control}  ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control}  ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control}  ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control}  ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Nombre</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputsValidity.name && (
          <p className={classes.invalidP}>Porfavor ingresa un Nombre vàlido!</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Direcciòn</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputsValidity.street && (
          <p className={classes.invalidP}>Por favor ingresa una Direcciòn vàlida!</p>
        )}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Còdigo postal</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formInputsValidity.postalCode && (
          <p className={classes.invalidP}>
            Por favor ingresa un Còdigo postal vàlido! (5 digits)!
          </p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">Ciudad</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputsValidity.city && (
          <p className={classes.invalidP}>Por favor ingresa un nombre de ciudad vàlido!</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancelar
        </button>
        <button className={classes.submit}>Confirmar</button>
      </div>
    </form>
  );
};

export default Checkout;
