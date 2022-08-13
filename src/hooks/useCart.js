import { useState } from "react";

const useCart = () => {
  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => {
    setShowCart(prev => !prev);
  };
  return { showCart, toggleCart };
};

export default useCart;
