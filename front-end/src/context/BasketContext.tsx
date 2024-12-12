import React, { createContext, useContext, useState, ReactNode } from "react";

type BasketItem = {
  name: string;
  price: string;
  img: string;
  quantity: number;
};

type BasketContextType = {
  basket: BasketItem[];
  addToBasket: (item: BasketItem) => void;
  removeFromBasket: (name: string) => void;
  updateQuantity: (name: string, newQuantity: number) => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const addToBasket = (item: BasketItem) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find((i) => i.name === item.name);
      if (existingItem) {
        return prevBasket.map((i) =>
          i.name === item.name
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevBasket, item];
    });
  };

  const removeFromBasket = (name: string) => {
    setBasket((prevBasket) => prevBasket.filter((item) => item.name !== name));
  };

  const updateQuantity = (name: string, newQuantity: number) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, updateQuantity }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
