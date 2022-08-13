import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input";
import { useRef } from "react";

const MealItemForm = ({ id, onAddToCart }) => {
  const amountInputRef = useRef();
  const submitHandler = e => {
    e.preventDefault();
    const orderAmount = +amountInputRef.current.value;
    onAddToCart(orderAmount);
  };
  const inputConfig = {
    id: `amount + ${id}`,
    type: "number",
    min: "1",
    max: "10",
    step: "1",
    defaultValue: "1",
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input ref={amountInputRef} label={"Amount"} input={inputConfig} />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
