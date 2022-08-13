import styles from "./MealItem.module.css";
import MealItemForm from "../MealItemForm/MealItemForm";
import { CartContext } from "../../../providers/CartProvider";
import { useContext } from "react";
const MealItem = props => {
  const { addItem } = useContext(CartContext);
  const { name, description, price, id } = props;
  const formatPrice = `$${Math.round(price * 100) / 100}`;
  const onAddToCartHandler = amount => {
    addItem({
      id,
      name,
      price,
      amount,
    });
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{formatPrice}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={onAddToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
