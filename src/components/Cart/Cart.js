import { useContext, useState } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem/CartItem";
import Checkout from "../Checkout/Checkout";

const Cart = ({ onClose }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { cart, addItem, removeItem, clearCart } = useContext(CartContext);
  const addItemHandler = item => {
    addItem({ ...item, amount: 1 });
  };
  const removeItemHandler = id => {
    removeItem(id);
  };
  const cartList = (
    <ul className={styles["cart-items"]}>
      {cart.items.map(item => (
        <CartItem
          key={item.id}
          {...item}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const onOrderHandler = () => {
    setIsCheckout(true);
  };
  const actionButtons = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={onClose}>
        Close
      </button>
      {cart.items.length > 0 && (
        <button className={styles["button"]} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = async userData => {
    const response = await fetch(
      "https://react-http-4c46f-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userData,
          orderedItems: cart.items,
        }),
      }
    );
    if (response.ok) {
      setSubmitted(true);
      clearCart();
      setSubmitted(false);
      setIsCheckout(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      {cartList}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{`$${cart.totalAmount}`}</span>
      </div>

      {isCheckout && !submitted && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={() => {
            setIsCheckout(false);
          }}
        />
      )}
      {!isCheckout && actionButtons}
    </Modal>
  );
};

export default Cart;
