import React, { createContext, useContext, useState } from "react";

const StaffContext = createContext();

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error("useStaff must be used within a StaffProvider");
  }
  return context;
};

export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState([]);

  return (
    <StaffContext.Provider value={{ staff, setStaff }}>
      {children}
    </StaffContext.Provider>
  );
};
