import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);

  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
