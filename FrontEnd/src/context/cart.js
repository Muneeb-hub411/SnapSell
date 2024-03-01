import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    let existingCartItem = localStorage.getItem('cart');
    if(existingCartItem) setCart(JSON.parse(existingCartItem));    
  },[])

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
