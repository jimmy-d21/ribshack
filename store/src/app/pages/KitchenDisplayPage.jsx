import { useState } from 'react';
import { Clock, Flame, CheckCircle, Package, MapPin, Phone, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { formatCurrency, formatPhoneNumber } from '../utils/formatters';
import { useOrders } from '../context/OrderContext';

const KitchenDisplayPage = () => {
  const { orders, isLoading, updateOrderStatus, getOrdersByStatus, getOrderCountByStatus } = useOrders();
  const [selectedStatus, setSelectedStatus] = useState('all');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading orders...</p>
        </div>
      </div>
    );
  }

  const statusFilters = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'pending', label: 'Pending', count: getOrderCountByStatus('pending') },
    { value: 'on_grill', label: 'On Grill', count: getOrderCountByStatus('on_grill') },
    { value: 'ready', label: 'Ready', count: getOrderCountByStatus('ready') }
  ];

  const displayOrders = selectedStatus === 'all' ? orders : getOrdersByStatus(selectedStatus);

  const getStatusBadge = (status) => {
    const configs = {
      pending: { bg: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: Clock, label: 'Pending' },
      on_grill: { bg: 'bg-orange-100 text-orange-800 border-orange-300', icon: Flame, label: 'On Grill' },
      ready: { bg: 'bg-green-100 text-green-800 border-green-300', icon: CheckCircle, label: 'Ready' }
    };
    return configs[status] || configs.pending;
  };

  const handleNextStatus = (orderId, currentStatus) => {
    const statusFlow = {
      pending: 'on_grill',
      on_grill: 'ready',
      ready: 'dispatched'
    };
    const nextStatus = statusFlow[currentStatus];
    if (nextStatus) {
      updateOrderStatus(orderId, nextStatus);
    }
  };

  const getNextActionButton = (status) => {
    const actions = {
      pending: { text: 'Start Cooking', class: 'bg-orange-600 hover:bg-orange-700' },
      on_grill: { text: 'Mark Ready', class: 'bg-green-600 hover:bg-green-700' },
      ready: { text: 'Complete', class: 'bg-blue-600 hover:bg-blue-700' }
    };
    return actions[status];
  };

  const getOrderTypeIcon = (type) => {
    if (type === 'delivery') return '🚚';
    if (type === 'takeout') return '🥡';
    return '🍽️';
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kitchen Display</h1>
        <p className="text-gray-600 mt-1">Manage and track orders in real-time</p>
      </div>

      {/* Status Filters */}
      <div className="flex gap-3 flex-wrap">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedStatus(filter.value)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedStatus === filter.value
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filter.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-sm ${
              selectedStatus === filter.value 
                ? 'bg-white/20' 
                : 'bg-gray-100'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {displayOrders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="size-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Orders will appear here when they come in</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayOrders.map((order) => {
            const statusConfig = getStatusBadge(order.status);
            const StatusIcon = statusConfig.icon;
            const actionButton = getNextActionButton(order.status);

            return (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        #{order.orderNumber}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{order.customerName}</p>
                    </div>
                    <div className="text-2xl">{getOrderTypeIcon(order.orderType)}</div>
                  </div>
                  <Badge className={`${statusConfig.bg} border w-fit flex items-center gap-1.5 px-2.5 py-1`}>
                    <StatusIcon className="size-3.5" />
                    {statusConfig.label}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <p className="text-xs font-semibold text-gray-600 uppercase">Items</p>
                    {order.items.map((item, idx) => (
                      <div key={`${order.id}-item-${idx}`} className="flex justify-between items-start">
                        <div className="flex-1">
                          <span className="font-medium text-gray-900">
                            <span className="text-orange-600 font-bold">{item.quantity}×</span> {item.productName}
                          </span>
                          {item.customization && (
                            <p className="text-xs text-gray-500 mt-0.5">{item.customization}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Special Instructions */}
                  {order.specialInstructions && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-xs font-semibold text-yellow-800 mb-1">⚠️ Special Instructions</p>
                      <p className="text-sm text-yellow-900">{order.specialInstructions}</p>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-2 text-sm">
                    {order.customerPhone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="size-4" />
                        <span>{formatPhoneNumber(order.customerPhone)}</span>
                      </div>
                    )}
                    {order.orderType === 'delivery' && order.deliveryAddress && (
                      <div className="flex items-start gap-2 text-gray-600">
                        <MapPin className="size-4 mt-0.5" />
                        <span className="flex-1 text-xs">{order.deliveryAddress}</span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Total</span>
                      <span className="text-xl font-bold text-gray-900">{formatCurrency(order.totalAmount)}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {actionButton && (
                    <Button
                      onClick={() => handleNextStatus(order.id, order.status)}
                      className={`w-full ${actionButton.class} text-white`}
                    >
                      {actionButton.text}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default KitchenDisplayPage;