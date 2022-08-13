import classes from './HeaderCartButton.module.css';
import CartIcon from '../../Cart/CartIcon/CartIcon';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../providers/CartProvider';

const HeaderCartButton = ({ onClick }) => {
  const [buttonBump, setButtonBump] = useState(false);
  const { cart } = useContext(CartContext);
  const itemsInCart = cart.items.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);

  const btnStyles = ` ${classes.button} ${buttonBump ? classes.bump : ''}`;

  useEffect(() => {
    if (cart.items.length === 0) {
      return;
    }
    setButtonBump(true);
    const timer = setTimeout(() => {
      setButtonBump(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [cart.items]);
  return (
    <button className={btnStyles} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemsInCart}</span>
    </button>
  );
};

export default HeaderCartButton;
