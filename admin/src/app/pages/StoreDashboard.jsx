import { useParams, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  Trophy,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useData } from "../context/DataContext";

export default function StoreDashboard() {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const { getStoreDashboard, branches } = useData();

  const storeData = getStoreDashboard(parseInt(branchId));
  const branchInfo = branches.find((b) => b.id === parseInt(branchId));

  if (!storeData || !branchInfo) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Branch not found</h2>
          <Button onClick={() => navigate("/admin/branches")} className="mt-4">
            <ArrowLeft className="size-4 mr-2" />
            Back to Branches
          </Button>
        </div>
      </div>
    );
  }

  const orderStatusData = [
    {
      name: "Completed",
      value: storeData.orderStatus.completed,
      color: "#10b981",
    },
    {
      name: "Preparing",
      value: storeData.orderStatus.preparing,
      color: "#f59e0b",
    },
    { name: "Pending", value: storeData.orderStatus.pending, color: "#3b82f6" },
    {
      name: "Cancelled",
      value: storeData.orderStatus.cancelled,
      color: "#ef4444",
    },
  ];

  const isClosed = branchInfo.status === "closed";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/branches")}
            className="rounded-xl"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-gray-900">
                {storeData.branchName}
              </h1>
              <Badge className={isClosed ? "bg-red-500" : "bg-green-500"}>
                {isClosed ? "Closed" : "Open"}
              </Badge>
            </div>
            <p className="text-gray-500 mt-1">{branchInfo.location}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Manager</div>
          <div className="font-semibold text-gray-900">
            {branchInfo.manager}
          </div>
          <div className="text-sm text-gray-500">{branchInfo.phone}</div>
        </div>
      </div>

      {isClosed && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle className="size-6 text-red-600" />
          <div>
            <div className="font-semibold text-red-900">
              Store Currently Closed
            </div>
            <div className="text-sm text-red-700">
              This branch is not operating today. Showing last available data.
            </div>
          </div>
        </div>
      )}

      {/* Today's KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Today's Revenue
            </CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="size-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              ₱{storeData.todayStats.revenue.toLocaleString()}
            </div>
            {!isClosed && (
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  <TrendingUp className="size-3.5" />
                  +14.3%
                </div>
                <span className="text-xs text-gray-500">vs yesterday</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Orders
            </CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="size-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {storeData.todayStats.orders}
            </div>
            {!isClosed && (
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                  <TrendingUp className="size-3.5" />
                  +7.7%
                </div>
                <span className="text-xs text-gray-500">vs yesterday</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg Order Value
            </CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="size-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              ₱{storeData.todayStats.avgOrderValue}
            </div>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Per customer transaction
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Customers Served
            </CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="size-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {storeData.todayStats.customers}
            </div>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Unique customers today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Revenue Trend */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <TrendingUp className="size-4 text-green-600" />
              </div>
              Weekly Revenue Trend
            </CardTitle>
            <CardDescription>Last 7 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={storeData.weeklyRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fill: "#6b7280" }} />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip
                  formatter={(value) => `₱${value.toLocaleString()}`}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Activity className="size-4 text-blue-600" />
              </div>
              Today's Order Status
            </CardTitle>
            <CardDescription>Real-time order breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="50%" height={250}>
                <PieChart>
                  <Pie
                    data={orderStatusData.filter((d) => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value} orders`}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {orderStatusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Orders */}
      {!isClosed && storeData.hourlyOrders.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5 text-orange-600" />
              Hourly Order Distribution
            </CardTitle>
            <CardDescription>Peak hours and order patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={storeData.hourlyOrders}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" tick={{ fill: "#6b7280" }} />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip
                  formatter={(value) => `${value} orders`}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="orders" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="size-5 text-yellow-500" />
              Top Selling Products Today
            </CardTitle>
            <CardDescription>Best performing menu items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storeData.topProducts.slice(0, 5).map((product, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                          ? "bg-gray-400"
                          : index === 2
                            ? "bg-orange-600"
                            : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.sold} units sold
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      ₱{product.revenue.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders & Inventory Alerts */}
        <div className="space-y-6">
          {/* Recent Orders */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="size-5 text-blue-600" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {storeData.recentOrders.length > 0 ? (
                  storeData.recentOrders.map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {order.status === "completed" ? (
                          <CheckCircle2 className="size-5 text-green-600" />
                        ) : order.status === "preparing" ? (
                          <Clock className="size-5 text-orange-600" />
                        ) : (
                          <XCircle className="size-5 text-red-600" />
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">
                            {order.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.time} • {order.items} items
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-gray-900">
                        ₱{order.total}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No orders today
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Inventory Alerts */}
          {storeData.inventoryAlerts.length > 0 && (
            <Card className="border-0 shadow-lg border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="size-5 text-orange-600" />
                  Inventory Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {storeData.inventoryAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        alert.status === "critical"
                          ? "bg-red-50 border border-red-200"
                          : "bg-orange-50 border border-orange-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {alert.item}
                          </div>
                          <div className="text-sm text-gray-600">
                            Current: {alert.current} | Min: {alert.minimum}
                          </div>
                        </div>
                        <Badge
                          className={
                            alert.status === "critical"
                              ? "bg-red-500"
                              : "bg-orange-500"
                          }
                        >
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
