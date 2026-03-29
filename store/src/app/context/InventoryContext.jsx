import { createContext, useContext, useState, useEffect } from 'react';
import { inventoryData } from '../data/inventoryData';

const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [restockRequests, setRestockRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from backend
    setInventory(inventoryData.inventory);
    setRestockRequests(inventoryData.restockRequests);
    setIsLoading(false);
  }, []);

  const getLowStockItems = () => {
    return inventory.filter(item => 
      item.status === 'low' || item.status === 'critical'
    );
  };

  const getCriticalStockItems = () => {
    return inventory.filter(item => item.status === 'critical');
  };

  const getAdequateStockItems = () => {
    return inventory.filter(item => item.status === 'adequate');
  };

  const getInventoryStats = () => {
    return {
      adequate: inventory.filter(item => item.status === 'adequate').length,
      low: inventory.filter(item => item.status === 'low').length,
      critical: inventory.filter(item => item.status === 'critical').length,
      total: inventory.length
    };
  };

  const createRestockRequest = (itemId, quantity, urgency) => {
    const item = inventory.find(i => i.itemId === itemId);
    if (!item) return null;

    const newRequest = {
      requestId: `REQ-${Date.now()}`,
      itemId: item.itemId,
      itemName: item.itemName,
      quantityRequested: quantity,
      unit: item.unit,
      urgency: urgency || 'normal',
      status: 'pending',
      requestNote: '',
      requestedAt: new Date().toISOString(),
      requestedBy: 'Juan Manager'
    };

    setRestockRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const getPendingRequests = () => {
    return restockRequests.filter(request => request.status === 'pending');
  };

  const value = {
    inventory,
    restockRequests,
    isLoading,
    getLowStockItems,
    getCriticalStockItems,
    getAdequateStockItems,
    getInventoryStats,
    createRestockRequest,
    getPendingRequests
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};