import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import { InventoryProvider } from "./context/InventoryContext";
import { NotificationProvider } from "./context/NotificationContext";
import { DashboardProvider } from "./context/DashboardContext";
import { MenuProvider } from "./context/MenuContext";
import { StaffProvider } from "./context/StaffContext";
import { router } from "./routes.jsx";

export default function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <OrderProvider>
          <InventoryProvider>
            <MenuProvider>
              <StaffProvider>
                <NotificationProvider>
                  <RouterProvider router={router} />
                </NotificationProvider>
              </StaffProvider>
            </MenuProvider>
          </InventoryProvider>
        </OrderProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}
