import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({});

  return (
    <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
};
