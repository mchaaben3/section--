import styles from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = input => {
  return input.trim() === "";
};
const isSixDigits = input => input.toString().length === 6;

const Checkout = ({ onCancel, onConfirm }) => {
  const [formInputValid, setFormInputValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const checkoutSubmitHandler = e => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const nameValid = !isEmpty(enteredName);
    const addressValid = !isEmpty(enteredAddress);
    const postalValid = isSixDigits(enteredPostal);
    const cityValid = !isEmpty(enteredCity);
    setFormInputValid({
      name: nameValid,
      street: addressValid,
      city: cityValid,
      postal: postalValid,
    });
    const formValid = nameValid && addressValid && postalValid && cityValid;
    if (!formValid) {
      return;
    }
    onConfirm({ enteredName, enteredAddress, enteredCity, enteredPostal });
  };
  return (
    <form onSubmit={checkoutSubmitHandler}>
      <div
        className={`${styles.control} ${
          formInputValid.name ? "" : styles.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={nameInputRef} />
        {!formInputValid.name && <p>Please enter a valid name.</p>}
      </div>
      <div
        className={`${styles.control} ${
          formInputValid.street ? "" : styles.invalid
        }`}
      >
        <label htmlFor="street">Address</label>
        <input id="street" type="text" ref={addressInputRef} />
        {!formInputValid.street && <p>Please enter a valid street.</p>}
      </div>
      <div
        className={`${styles.control} ${
          formInputValid.postal ? "" : styles.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input id="postal" type="text" ref={postalInputRef} />
        {!formInputValid.postal && <p>Please enter a valid postal code.</p>}
      </div>
      <div
        className={`${styles.control} ${
          formInputValid.city ? "" : styles.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityInputRef} />
        {!formInputValid.city && <p>Please enter a valid city.</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
