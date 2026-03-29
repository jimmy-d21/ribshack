import { 
  DollarSign, 
  ShoppingCart, 
  Store, 
  TrendingUp,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  Trophy,
  BarChart3,
  Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '../utils/formatters';
import { useDashboard } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { todayStats, bestsellerOfTheDay, hourlyRevenue, categorySales, recentActivity, isLoading } = useDashboard();
  const { branch } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Prepare order status data for pie chart
  const orderStatusData = [
    { name: 'Dine-in', value: todayStats?.dineInOrders || 0, color: '#10b981' },
    { name: 'Delivery', value: todayStats?.deliveryOrders || 0, color: '#3b82f6' },
    { name: 'Takeout', value: Math.floor((todayStats?.totalOrders || 0) * 0.15), color: '#f59e0b' }
  ];

  // Prepare weekly revenue data (last 7 days simulation)
  const weeklyRevenue = [
    { day: 'Mon', revenue: 45000 },
    { day: 'Tue', revenue: 52000 },
    { day: 'Wed', revenue: 48000 },
    { day: 'Thu', revenue: 61000 },
    { day: 'Fri', revenue: 55000 },
    { day: 'Sat', revenue: 67000 },
    { day: 'Sun', revenue: todayStats?.grossRevenue || 0 }
  ];

  // Top products from category sales
  const topProducts = categorySales?.map((cat, idx) => ({
    name: cat.category,
    sold: cat.orders,
    revenue: cat.revenue
  })) || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold text-gray-900">{branch?.branchName || 'SM Bacolod'}</h1>
          <Badge className="bg-green-500">
            Open
          </Badge>
        </div>
        <p className="text-gray-500 mt-1">{branch?.address || 'South Wing, South Building, SM City Bacolod'}</p>
      </div>

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
            <div className="text-3xl font-bold text-gray-900">{formatCurrency(todayStats?.grossRevenue || 0)}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                <TrendingUp className="size-3.5" />
                +14.3%
              </div>
              <span className="text-xs text-gray-500">vs yesterday</span>
            </div>
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
            <div className="text-3xl font-bold text-gray-900">{todayStats?.totalOrders || 0}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                <TrendingUp className="size-3.5" />
                +7.7%
              </div>
              <span className="text-xs text-gray-500">vs yesterday</span>
            </div>
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
            <div className="text-3xl font-bold text-gray-900">{formatCurrency(todayStats?.avgOrderValue || 0)}</div>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Per customer transaction
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Dine-in Orders
            </CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Store className="size-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{todayStats?.dineInOrders || 0}</div>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              {Math.round((todayStats?.dineInOrders || 0) / (todayStats?.totalOrders || 1) * 100)}% of total orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Revenue Trend */}
        <Card className="border-0 shadow-lg" key="weekly-revenue-card">
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
            <div key="weekly-revenue-chart">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyRevenue}>
                  <defs>
                    <linearGradient id="colorRevenueWeekly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fill: '#6b7280' }} />
                  <YAxis tick={{ fill: '#6b7280' }} />
                  <Tooltip 
                    formatter={(value) => `₱${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenueWeekly)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Order Type Distribution */}
        <Card className="border-0 shadow-lg" key="order-distribution-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Activity className="size-4 text-blue-600" />
              </div>
              Order Type Distribution
            </CardTitle>
            <CardDescription>Today's order breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div key="pie-chart-wrapper">
                <ResponsiveContainer width={250} height={250}>
                  <PieChart>
                    <Pie
                      data={orderStatusData}
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
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {orderStatusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Revenue Chart */}
      <Card className="border-0 shadow-lg" key="hourly-revenue-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-100 rounded-lg">
              <Clock className="size-4 text-orange-600" />
            </div>
            Hourly Revenue Distribution
          </CardTitle>
          <CardDescription>Peak hours and revenue patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div key="hourly-revenue-chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  formatter={(value) => `₱${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="revenue" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Categories */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 bg-yellow-100 rounded-lg">
                <Trophy className="size-4 text-yellow-600" />
              </div>
              Top Selling Categories Today
            </CardTitle>
            <CardDescription>Best performing menu categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.slice(0, 5).map((product, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.sold} orders</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{formatCurrency(product.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders & Bestseller */}
        <div className="space-y-6">
          {/* Recent Orders */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <ShoppingCart className="size-4 text-blue-600" />
                </div>
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => {
                  const activityIcons = {
                    order_completed: <CheckCircle2 className="size-5 text-green-600" />,
                    inventory_alert: <AlertTriangle className="size-5 text-orange-600" />,
                    staff_checkin: <Users className="size-5 text-blue-600" />
                  };

                  return (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      {activityIcons[activity.type]}
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleTimeString('en-PH', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Bestseller of the Day */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="size-5 text-amber-600" />
                Bestseller of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <img
                  src={bestsellerOfTheDay.imageUrl}
                  alt={bestsellerOfTheDay.productName}
                  className="w-20 h-20 rounded-lg object-cover shadow-md"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {bestsellerOfTheDay.productName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{bestsellerOfTheDay.category}</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Sold</p>
                      <p className="text-lg font-bold text-orange-600">{bestsellerOfTheDay.quantitySold}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(bestsellerOfTheDay.revenue)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-100 rounded-lg">
              <Activity className="size-4 text-indigo-600" />
            </div>
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates from your store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => {
              const activityIcons = {
                order_completed: <CheckCircle2 className="size-5 text-green-600" />,
                inventory_alert: <AlertTriangle className="size-5 text-orange-600" />,
                staff_checkin: <Users className="size-5 text-blue-600" />
              };

              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  {activityIcons[activity.type]}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleTimeString('en-PH', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;