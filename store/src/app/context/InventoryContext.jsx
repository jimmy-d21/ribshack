import React, { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);

  return (
    <InventoryContext.Provider value={{ inventory, setInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};
