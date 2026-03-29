import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import KitchenDisplayPage from "./pages/KitchenDisplayPage";
import LoginPage from "./pages/LoginPage";
import MenuManagementPage from "./pages/MenuManagementPage";
import StaffRosterPage from "./pages/StaffRosterPage";

export const router = createBrowserRouter([
  { path: "/", element: <DashboardPage /> },
  { path: "/inventory", element: <InventoryPage /> },
  { path: "/kitchen", element: <KitchenDisplayPage /> },
  { path: "/menu", element: <MenuManagementPage /> },
  { path: "/staff", element: <StaffRosterPage /> },
  { path: "/login", element: <LoginPage /> },
]);
