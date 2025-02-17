import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isLogIn, setIsLogIn] = useState(false);
  const [isWholesale, setIsWholesale] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]) //for order sucessfull and order id and sts 

  const addToCart = (product, quantity, isWholesale) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.item_cd === product.item_cd && item.isWholesale === isWholesale
      );
  
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        console.log(updatedItems);
        
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        const newItem = {
          ...product,
          quantity,
          isWholesale,
        };
        const updatedItems = [...prevItems, newItem];
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
      }
    });
  };
  


  const removeFromCart = (productId, isWholesale, quantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.item_cd !== productId || item.isWholesale !== isWholesale || item.quantity !== quantity
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };
  


  const updateQuantity = (productId, newQuantity, isWholesale) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.item_cd === productId && item.isWholesale === isWholesale ) {
          return {
            ...item,
            quantity: Math.max(newQuantity, 1),
          };
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };


  const togglePriceType = (productId, isWholesale, quantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.item_cd === productId && item.isWholesale === isWholesale && item.quantity === quantity) {
          return {
            ...item,
            isWholesale: !isWholesale,
          };
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
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



