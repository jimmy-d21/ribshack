import { createContext, useContext, useState, useEffect } from 'react';

// Import all data modules
import { globalAnalyticsData } from '../data/globalAnalytics';
import { branchManagementData } from '../data/branchManagement';
import { storeDashboardData } from '../data/storeDashboard';
import { requestCenterData } from '../data/requestCenter';
import { productCatalogData } from '../data/productCatalog';
import { financeReportsData } from '../data/financeReports';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Global Analytics State
  const [globalAnalytics, setGlobalAnalytics] = useState(globalAnalyticsData);

  // Branch Management State
  const [branches, setBranches] = useState(branchManagementData.branches);
  const [cities] = useState(branchManagementData.cities);
  const [regions] = useState(branchManagementData.regions);

  // Request Center State
  const [requests, setRequests] = useState(requestCenterData.requests);
  const [requestStats, setRequestStats] = useState(requestCenterData.stats);

  // Product Catalog State
  const [products, setProducts] = useState(productCatalogData.products);
  const [categories] = useState(productCatalogData.categories);

  // Finance Reports State
  const [financeData, setFinanceData] = useState(financeReportsData);

  // Branch Management Functions
  const addBranch = (newBranch) => {
    const branch = {
      ...newBranch,
      id: branches.length + 1,
      dailyRevenue: 0,
      orders: 0,
      status: 'open'
    };
    setBranches([...branches, branch]);
    return branch;
  };

  const updateBranch = (id, updatedData) => {
    setBranches(branches.map(branch => 
      branch.id === id ? { ...branch, ...updatedData } : branch
    ));
  };

  const deleteBranch = (id) => {
    setBranches(branches.filter(branch => branch.id !== id));
  };

  // Request Center Functions
  const updateRequestStatus = (id, status) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status } : request
    ));
    
    // Update stats
    const newStats = { ...requestStats };
    const oldRequest = requests.find(r => r.id === id);
    if (oldRequest) {
      newStats[oldRequest.status]--;
      newStats[status]++;
      setRequestStats(newStats);
    }
  };

  const updateRequestPriority = (id, priority) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, priority } : request
    ));
  };

  // Product Catalog Functions
  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: products.length + 1
    };
    setProducts([...products, product]);
    return product;
  };

  const updateProduct = (id, updatedData) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, ...updatedData } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const toggleProductAvailability = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, available: !product.available } : product
    ));
  };

  // Store Dashboard Functions
  const getStoreDashboard = (branchId) => {
    return storeDashboardData.getStoreDashboardData(parseInt(branchId));
  };

  const value = {
    // Global Analytics
    globalAnalytics,
    setGlobalAnalytics,

    // Branch Management
    branches,
    cities,
    regions,
    addBranch,
    updateBranch,
    deleteBranch,

    // Store Dashboard
    getStoreDashboard,

    // Request Center
    requests,
    requestStats,
    updateRequestStatus,
    updateRequestPriority,

    // Product Catalog
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductAvailability,

    // Finance Reports
    financeData,
    setFinanceData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
