import styles from "./Input.module.css";
import { forwardRef } from "react";

const Input = forwardRef(({ label, input }, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={input.id}>{label}</label>
      <input ref={ref} {...input} />
    </div>
  );
});

export default Input;
