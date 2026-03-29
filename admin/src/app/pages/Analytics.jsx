import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Store, 
  ShoppingCart,
  Award,
  Sparkles,
  MapPin,
  TrendingDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { useData } from '../context/DataContext';

export default function Analytics() {
  const { globalAnalytics } = useData();
  
  const {
    kpi,
    regionPerformance,
    weeklyRevenue,
    topBranches,
    topProducts,
    salesByCategory,
    monthlyComparison
  } = globalAnalytics;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg">
            <Sparkles className="size-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Global Analytics</h1>
            <p className="text-gray-500 mt-1">Real-time performance across all Philippines</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Last Updated</div>
          <div className="font-semibold text-gray-900">Today, 3:45 PM</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue Today
            </CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="size-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">₱{kpi.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                <TrendingUp className="size-3.5" />
                {kpi.trends.revenue}
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
            <div className="text-3xl font-bold text-gray-900">{kpi.totalOrders.toLocaleString()}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                <TrendingUp className="size-3.5" />
                {kpi.trends.orders}
              </div>
              <span className="text-xs text-gray-500">vs yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Stores
            </CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Store className="size-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{kpi.activeStores}</div>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Nationwide operations
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg Order Value
            </CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="size-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">₱{kpi.avgOrderValue.toFixed(2)}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center gap-1 text-sm font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                <TrendingUp className="size-3.5" />
                {kpi.trends.avgOrder}
              </div>
              <span className="text-xs text-gray-500">per transaction</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Region Performance */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="size-5 text-orange-600" />
            Regional Performance
          </CardTitle>
          <CardDescription>Revenue and order distribution across regions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regionPerformance.map((region, index) => (
              <div 
                key={index}
                className="relative p-6 rounded-2xl border-2 hover:shadow-lg transition-all duration-300"
                style={{ 
                  borderColor: region.color,
                  background: `linear-gradient(135deg, ${region.color}08 0%, ${region.color}18 100%)`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{region.region}</h3>
                    <p className="text-sm text-gray-500">{region.branches} Branches</p>
                  </div>
                  <div 
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: region.color }}
                  >
                    {region.percentage}%
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">Revenue</div>
                    <div className="text-2xl font-bold" style={{ color: region.color }}>
                      ₱{region.revenue.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Orders</div>
                    <div className="text-2xl font-bold text-gray-900">{region.orders}</div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                      <TrendingUp className="size-4" />
                      {region.growth}
                    </div>
                    <span className="text-xs text-gray-500">growth rate</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Revenue by Region */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <TrendingUp className="size-4 text-green-600" />
              </div>
              Weekly Revenue by Region
            </CardTitle>
            <CardDescription>Last 7 days performance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={weeklyRevenue}>
                <defs>
                  <linearGradient id="colorVisayas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMindanao" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLuzon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  formatter={(value) => `₱${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="visayas" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorVisayas)"
                  name="Visayas"
                />
                <Area 
                  type="monotone" 
                  dataKey="mindanao" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorMindanao)"
                  name="Mindanao"
                />
                <Area 
                  type="monotone" 
                  dataKey="luzon" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorLuzon)"
                  name="Luzon"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <ShoppingCart className="size-4 text-blue-600" />
              </div>
              Sales by Category
            </CardTitle>
            <CardDescription>Product category distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8">
              <ResponsiveContainer width="50%" height={300}>
                <PieChart>
                  <Pie
                    data={salesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {salesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `₱${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {salesByCategory.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">₱{item.value.toLocaleString()} ({item.percentage}%)</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Comparison */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-100 rounded-lg">
              <BarChart className="size-4 text-orange-600" />
            </div>
            Monthly Revenue Comparison
          </CardTitle>
          <CardDescription>Current year vs previous year</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280' }} />
              <YAxis tick={{ fill: '#6b7280' }} />
              <Tooltip 
                formatter={(value) => `₱${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Bar dataKey="previous" fill="#cbd5e1" name="2025" radius={[8, 8, 0, 0]} />
              <Bar dataKey="current" fill="#f97316" name="2026" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Branches */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="size-5 text-yellow-500" />
            Top 10 Performing Branches
          </CardTitle>
          <CardDescription>Highest revenue generators today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Branch</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Location</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Region</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">Revenue</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">Orders</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">Growth</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topBranches.map((branch, index) => (
                  <tr key={branch.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{branch.name}</div>
                      {branch.note && (
                        <div className="text-xs text-orange-600 font-medium">{branch.note}</div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-600">{branch.location}</td>
                    <td className="py-4 px-4">
                      <Badge 
                        className={
                          branch.region === 'Visayas' ? 'bg-green-100 text-green-700' :
                          branch.region === 'Mindanao' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }
                      >
                        {branch.region}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-green-600">
                      ₱{branch.revenue.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right font-semibold">{branch.orders}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-sm font-semibold text-green-600">
                        <TrendingUp className="size-4" />
                        {branch.growth}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{branch.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="size-5 text-orange-600" />
            Best Selling Products
          </CardTitle>
          <CardDescription>Most popular menu items across all locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topProducts.map((product, index) => (
              <div 
                key={product.id}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all"
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.category} • {product.sold} sold</div>
                  <div className="flex items-center gap-2 mt-1">
                    {product.popularIn.map((region, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">₱{product.revenue.toLocaleString()}</div>
                  <div className="text-xs text-green-600 font-medium">{product.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}