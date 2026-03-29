import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import Analytics from "./pages/Analytics";
import BranchManagement from "./pages/BranchManagement";
import FinanceReports from "./pages/FinanceReports";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProductCatalog from "./pages/ProductCatalog";
import RequestCenter from "./pages/RequestCenter";
import StoreDashboard from "./pages/StoreDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <StoreDashboard /> },
      { path: "/analytics", element: <Analytics /> },
      { path: "/branch-management", element: <BranchManagement /> },
      { path: "/finance-reports", element: <FinanceReports /> },
      { path: "/product-catalog", element: <ProductCatalog /> },
      { path: "/request-center", element: <RequestCenter /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);
