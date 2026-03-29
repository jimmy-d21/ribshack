import { Package, AlertTriangle, TrendingDown, CheckCircle, Send, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useInventory } from '../context/InventoryContext';

const InventoryPage = () => {
  const {
    inventory,
    restockRequests,
    isLoading,
    getLowStockItems,
    getCriticalStockItems,
    getAdequateStockItems,
    getInventoryStats,
    getPendingRequests,
    createRestockRequest
  } = useInventory();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading inventory...</p>
        </div>
      </div>
    );
  }

  const lowStockItems = getLowStockItems();
  const criticalStockItems = getCriticalStockItems();
  const adequateStockItems = getAdequateStockItems();
  const stats = getInventoryStats();
  const pendingRequests = getPendingRequests();

  const getStatusColor = (status) => {
    if (status === 'critical') return 'bg-red-100 text-red-800 border-red-300';
    if (status === 'low') return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-green-100 text-green-800 border-green-300';
  };

  const handleRestockRequest = (item) => {
    const urgency = item.status === 'critical' ? 'critical' : 'high';
    const quantity = item.reorderQuantity || item.maximumThreshold - item.currentStock;
    createRestockRequest(item.id || item.itemId, quantity, urgency);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-600 mt-1">Track and manage your stock levels</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card key="adequate-stat">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Adequate Stock</CardTitle>
              <CheckCircle className="size-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.adequate}</div>
            <p className="text-xs text-gray-500 mt-1">In good stock</p>
          </CardContent>
        </Card>

        <Card key="low-stat">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Low Stock</CardTitle>
              <TrendingDown className="size-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.low}</div>
            <p className="text-xs text-gray-500 mt-1">Need restock soon</p>
          </CardContent>
        </Card>

        <Card key="critical-stat">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Critical Stock</CardTitle>
              <AlertTriangle className="size-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.critical}</div>
            <p className="text-xs text-gray-500 mt-1">Immediate attention</p>
          </CardContent>
        </Card>

        <Card key="pending-stat">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Requests</CardTitle>
              <Clock className="size-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{pendingRequests.length}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      {criticalStockItems.length > 0 && (
        <Card className="border-2 border-red-300 bg-red-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="size-6 text-red-600" />
              <div>
                <CardTitle className="text-red-900">Critical Stock Alert</CardTitle>
                <p className="text-sm text-red-700 mt-1">
                  {criticalStockItems.length} items require immediate restocking
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalStockItems.map((item) => (
                <div
                  key={item.id || item.itemId}
                  className="p-4 bg-white rounded-lg border border-red-200 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.itemName}</h4>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <Badge className="bg-gray-100 text-gray-700 border-gray-300">{item.itemType}</Badge>
                      <span className="text-red-600 font-bold">
                        {item.currentStock} {item.unit}
                      </span>
                      <span className="text-gray-500">Min: {item.minimumThreshold}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRestockRequest(item)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Send className="size-4 mr-2" />
                    Request Restock
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Items */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="size-5 text-yellow-600" />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="size-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No low stock items</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id || item.itemId}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-yellow-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{item.itemName}</h4>
                        <Badge className={`${getStatusColor(item.status)} border mt-1`}>
                          {item.itemType}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current Stock:</span>
                        <span className="font-bold text-yellow-700">
                          {item.currentStock} {item.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{
                            width: `${Math.min((item.currentStock / item.maximumThreshold) * 100, 100)}%`
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Min: {item.minimumThreshold}</span>
                        <span>Max: {item.maximumThreshold}</span>
                      </div>
                    </div>

                    {item.lastRestockedAt && (
                      <p className="text-xs text-gray-500 mt-3">
                        Last restocked: {new Date(item.lastRestockedAt).toLocaleDateString()}
                      </p>
                    )}

                    <Button
                      onClick={() => handleRestockRequest(item)}
                      className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700 text-white"
                      size="sm"
                    >
                      <Send className="size-3 mr-2" />
                      Request Restock
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5 text-blue-600" />
              Restock Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8">
                <Package className="size-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No pending requests</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <div
                    key={request.requestId}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900 text-sm">{request.itemName}</h4>
                      <Badge
                        className={
                          request.urgency === 'critical'
                            ? 'bg-red-600 text-white'
                            : request.urgency === 'high'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-blue-600 text-white'
                        }
                      >
                        {request.urgency}
                      </Badge>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-bold text-gray-900">
                          {request.quantityRequested} {request.unit}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Requested: {new Date(request.requestedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {request.requestNote && (
                      <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-200">
                        {request.requestNote}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="size-5 text-gray-600" />
            All Inventory Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Item</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Current Stock</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Min Threshold</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id || item.itemId} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-900">{item.itemName}</td>
                    <td className="py-4 px-4">
                      <Badge className="bg-gray-100 text-gray-700 border-gray-300">{item.itemType}</Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`font-bold ${
                          item.status === 'critical'
                            ? 'text-red-600'
                            : item.status === 'low'
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`}
                      >
                        {item.currentStock} {item.unit}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-600">
                      {item.minimumThreshold} {item.unit}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge className={`${getStatusColor(item.status)} border`}>
                        {item.status === 'critical'
                          ? 'Critical'
                          : item.status === 'low'
                          ? 'Low Stock'
                          : 'Adequate'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {(item.status === 'low' || item.status === 'critical') && (
                        <Button
                          onClick={() => handleRestockRequest(item)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Send className="size-3 mr-1" />
                          Request
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;