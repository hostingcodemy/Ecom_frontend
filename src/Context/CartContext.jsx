import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isLogIn, setIsLogIn] = useState(false);
  const [isWholesale, setIsWholesale] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]) 

  const addToCart = (product, quantity, isWholesale) => {
    setCartItems((prevItems) => {

      const existingItemIndex = prevItems.findIndex(
        (item) => item.item_cd === product.item_cd && item.isWholesale === isWholesale
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        const newItem = {
          ...product,
          quantity,
          isWholesale,
        };
        return [...prevItems, newItem];
      }
    });
    setCartCount((prevCount) => prevCount + quantity);
  };

  const removeFromCart = (productId, isWholesale) => {
    setCartItems((prevItems) => prevItems.filter(item => !(item.item_cd === productId && item.isWholesale === isWholesale)));
  };

  const updateQuantity = (productId, newQuantity, isWholesale) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.item_cd === productId && item.isWholesale === isWholesale
          ? { ...item, quantity: newQuantity }
          : item
      )
    );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  };                                                                                                                       

  const togglePriceType = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.item_cd === productId
          ? { ...item, isWholesale: !item.isWholesale }
          : item
      )
    );
  };

  // confetti function
  const handleConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  return (
    <CartContext.Provider value={{
      isLogIn,
      setCartItems,
      setIsLogIn,
      setIsWholesale,
      isWholesale,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      togglePriceType,
      setCartCount,
      cartCount,
      handleConfetti,
      showConfetti,
      orderDetails,
      setOrderDetails
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);



