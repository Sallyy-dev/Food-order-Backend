import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to
  const addToCart = (item, size, price, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item._id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === item._id && i.size === size
            ? { ...i, qty: i.qty + quantity }
            : i
        );
      }
      return [
        ...prev,
        {
          id: item._id,
          name: item.name,
          img: item.image || item.img || "",
          price,
          size,
          qty: quantity,
        },
      ];
    });
  };
  // increase quantity
  const increaseQty = (id, size) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size ? { ...i, qty: i.qty + 1 } : i
      )
    );
  };
  // decrease quantity
  const decreaseQty = (id, size) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size
          ? { ...i, qty: i.qty > 1 ? i.qty - 1 : 1 }
          : i
      )
    );
  };
  // remove item from cart
  const removeItem = (id, size) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
