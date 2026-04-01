import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  LayoutDashboard,
  Store,
  Inbox,
  Package,
  FileText,
  LogOut,
  Menu,
  X,
  Flame,
} from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("ribshack_admin_auth");
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ribshack_admin_auth");
    navigate("/login");
  };

  const menuItems = [
    {
      path: "/admin/analytics",
      icon: LayoutDashboard,
      label: "Global Analytics",
    },
    { path: "/admin/branches", icon: Store, label: "Branch Management" },
    { path: "/admin/requests", icon: Inbox, label: "Request Center" },
    { path: "/admin/products", icon: Package, label: "Product Catalog" },
    { path: "/admin/finance", icon: FileText, label: "Finance & VAT" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
      >
        {sidebarOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-72 bg-gradient-to-b from-orange-600 via-red-600 to-red-700 text-white
        transform transition-transform duration-300 ease-in-out
        shadow-2xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-orange-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Flame className="size-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Ribshack</h1>
                <p className="text-xs text-orange-100 mt-0.5">
                  HQ Control Tower
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3.5 rounded-xl
                      transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-white text-orange-600 font-semibold shadow-lg transform scale-105"
                          : "text-orange-50 hover:bg-white/10 hover:translate-x-1"
                      }
                    `}
                  >
                    <Icon
                      className={`size-5 ${isActive ? "text-orange-600" : "group-hover:text-white"}`}
                    />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Logout */}
          <div className="p-4 border-t border-orange-500/30 bg-black/10">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10 hover:text-white h-12 rounded-xl transition-all group"
            >
              <LogOut className="size-5 mr-3 group-hover:rotate-12 transition-transform" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
