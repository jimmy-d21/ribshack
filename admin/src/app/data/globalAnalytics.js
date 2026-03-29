// Global Analytics Page Data
// This file contains all data needed for the Global Analytics dashboard

export const globalAnalyticsData = {
  // Key Performance Indicators
  kpi: {
    totalRevenue: 823400,
    totalOrders: 1484,
    activeStores: 20,
    avgOrderValue: 554.72,
    trends: {
      revenue: '+18.2%',
      orders: '+12.5%',
      stores: '+25%',
      avgOrder: '+4.8%'
    }
  },

  // Regional Performance Breakdown
  regionPerformance: [
    {
      region: 'Visayas',
      branches: 10,
      revenue: 432500,
      orders: 731,
      growth: '+15.3%',
      color: '#10b981',
      percentage: 52.5
    },
    {
      region: 'Mindanao',
      branches: 6,
      revenue: 240800,
      orders: 445,
      growth: '+21.7%',
      color: '#f59e0b',
      percentage: 29.3
    },
    {
      region: 'Luzon & Metro Manila',
      branches: 4,
      revenue: 150100,
      orders: 308,
      growth: '+28.4%',
      color: '#3b82f6',
      percentage: 18.2
    }
  ],

  // Weekly Revenue Trend by Region
  weeklyRevenue: [
    { 
      day: 'Monday',
      visayas: 58200,
      mindanao: 32400,
      luzon: 19800,
      total: 110400
    },
    { 
      day: 'Tuesday',
      visayas: 61500,
      mindanao: 34200,
      luzon: 21200,
      total: 116900
    },
    { 
      day: 'Wednesday',
      visayas: 64800,
      mindanao: 35800,
      luzon: 22500,
      total: 123100
    },
    { 
      day: 'Thursday',
      visayas: 67200,
      mindanao: 37400,
      luzon: 23800,
      total: 128400
    },
    { 
      day: 'Friday',
      visayas: 72300,
      mindanao: 40100,
      luzon: 25400,
      total: 137800
    },
    { 
      day: 'Saturday',
      visayas: 78500,
      mindanao: 43600,
      luzon: 27500,
      total: 149600
    },
    { 
      day: 'Sunday',
      visayas: 74200,
      mindanao: 41200,
      luzon: 26000,
      total: 141400
    }
  ],

  // Top Performing Branches Nationwide
  topBranches: [
    { 
      id: 11,
      name: 'SM Lanang Premier',
      location: 'Davao',
      region: 'Mindanao',
      revenue: 58700,
      orders: 102,
      growth: '+24.5%',
      rating: 4.9,
      note: 'Largest Branch'
    },
    { 
      id: 4,
      name: 'SM Seaside Cebu',
      location: 'Cebu',
      region: 'Visayas',
      revenue: 52300,
      orders: 94,
      growth: '+19.2%',
      rating: 4.8
    },
    { 
      id: 5,
      name: 'SM City Cebu',
      location: 'Cebu',
      region: 'Visayas',
      revenue: 48900,
      orders: 88,
      growth: '+16.8%',
      rating: 4.7
    },
    { 
      id: 17,
      name: 'College Point Manila',
      location: 'Manila',
      region: 'Luzon',
      revenue: 46800,
      orders: 92,
      growth: '+31.2%',
      rating: 4.8,
      note: 'Student Favorite'
    },
    { 
      id: 1,
      name: 'SM City Bacolod',
      location: 'Bacolod',
      region: 'Visayas',
      revenue: 45200,
      orders: 87,
      growth: '+14.3%',
      rating: 4.9,
      note: 'Original Location'
    },
    { 
      id: 6,
      name: 'Robinsons Galleria Cebu',
      location: 'Cebu',
      region: 'Visayas',
      revenue: 44500,
      orders: 81,
      growth: '+17.5%',
      rating: 4.7,
      note: '10th Branch'
    },
    { 
      id: 3,
      name: 'Ayala Capitol Central',
      location: 'Bacolod',
      region: 'Visayas',
      revenue: 42800,
      orders: 79,
      growth: '+15.6%',
      rating: 4.6
    },
    { 
      id: 19,
      name: 'SM Grand Central',
      location: 'Caloocan',
      region: 'Luzon',
      revenue: 41800,
      orders: 78,
      growth: '+26.3%',
      rating: 4.7
    },
    { 
      id: 12,
      name: 'SM City General Santos',
      location: 'General Santos',
      region: 'Mindanao',
      revenue: 41200,
      orders: 76,
      growth: '+20.1%',
      rating: 4.6
    },
    { 
      id: 8,
      name: 'SM City Iloilo',
      location: 'Iloilo',
      region: 'Visayas',
      revenue: 39800,
      orders: 74,
      growth: '+13.8%',
      rating: 4.5
    }
  ],

  // Best Selling Products Nationwide
  topProducts: [
    {
      id: 1,
      name: 'Chicken Inasal (Pecho)',
      category: 'Chicken',
      sold: 892,
      revenue: 115088,
      growth: '+22.3%',
      popularIn: ['Visayas', 'Luzon']
    },
    {
      id: 2,
      name: 'Pork Spare Ribs',
      category: 'Pork',
      sold: 745,
      revenue: 148255,
      growth: '+18.7%',
      popularIn: ['Visayas', 'Mindanao']
    },
    {
      id: 3,
      name: 'Korean Pork Bulgogi',
      category: 'Pork',
      sold: 634,
      revenue: 119846,
      growth: '+25.1%',
      popularIn: ['Luzon', 'Mindanao']
    },
    {
      id: 4,
      name: 'Grilled Blue Marlin',
      category: 'Seafood',
      sold: 512,
      revenue: 132608,
      growth: '+15.8%',
      popularIn: ['Visayas', 'Mindanao']
    },
    {
      id: 5,
      name: 'BBQ Pork Skewers',
      category: 'Pork',
      sold: 689,
      revenue: 61321,
      growth: '+19.4%',
      popularIn: ['All Regions']
    },
    {
      id: 6,
      name: 'Korean Beef Bulgogi',
      category: 'Beef',
      sold: 456,
      revenue: 104472,
      growth: '+28.6%',
      popularIn: ['Luzon', 'Visayas']
    },
    {
      id: 7,
      name: 'Chicken Inasal (Paa)',
      category: 'Chicken',
      sold: 721,
      revenue: 85769,
      growth: '+16.2%',
      popularIn: ['Visayas', 'Mindanao']
    },
    {
      id: 8,
      name: 'Grilled Squid',
      category: 'Seafood',
      sold: 498,
      revenue: 84132,
      growth: '+21.5%',
      popularIn: ['Visayas', 'Luzon']
    }
  ],

  // Sales Distribution by Category
  salesByCategory: [
    { name: 'Pork BBQ', value: 329467, percentage: 40, color: '#ef4444' },
    { name: 'Chicken', value: 200857, percentage: 24.4, color: '#f59e0b' },
    { name: 'Seafood', value: 216740, percentage: 26.3, color: '#3b82f6' },
    { name: 'Beef', value: 76336, percentage: 9.3, color: '#8b5cf6' }
  ],

  // Monthly Revenue Comparison (Year-over-Year)
  monthlyComparison: [
    { month: 'Jan', current: 2450000, previous: 2100000 },
    { month: 'Feb', current: 2680000, previous: 2250000 },
    { month: 'Mar', current: 2920000, previous: 2480000 },
    { month: 'Apr', current: 3150000, previous: 2650000 },
    { month: 'May', current: 3380000, previous: 2890000 },
    { month: 'Jun', current: 3520000, previous: 2980000 }
  ],

  // City-Level Performance
  cityPerformance: [
    { city: 'Cebu', branches: 4, revenue: 189700, orders: 344, region: 'Visayas' },
    { city: 'Bacolod', branches: 3, revenue: 126500, orders: 238, region: 'Visayas' },
    { city: 'Davao', branches: 1, revenue: 58700, orders: 102, region: 'Mindanao' },
    { city: 'Manila', branches: 1, revenue: 46800, orders: 92, region: 'Luzon' },
    { city: 'Caloocan', branches: 2, revenue: 81300, orders: 153, region: 'Luzon' },
    { city: 'General Santos', branches: 1, revenue: 41200, orders: 76, region: 'Mindanao' },
    { city: 'Iloilo', branches: 1, revenue: 39800, orders: 74, region: 'Visayas' },
    { city: 'Butuan', branches: 1, revenue: 37900, orders: 71, region: 'Mindanao' },
    { city: 'Koronadal', branches: 1, revenue: 35600, orders: 67, region: 'Mindanao' },
    { city: 'Zamboanga', branches: 1, revenue: 34200, orders: 65, region: 'Mindanao' },
    { city: 'Cotabato', branches: 1, revenue: 33400, orders: 64, region: 'Mindanao' },
    { city: 'Puerto Princesa', branches: 1, revenue: 32600, orders: 63, region: 'Luzon' },
    { city: 'Roxas', branches: 1, revenue: 28400, orders: 56, region: 'Visayas' },
    { city: 'Ormoc', branches: 1, revenue: 26800, orders: 52, region: 'Visayas' },
    { city: 'Lapu-Lapu', branches: 1, revenue: 36200, orders: 68, region: 'Visayas' }
  ],

  // Hourly Order Pattern
  hourlyOrders: [
    { hour: '10 AM', orders: 45 },
    { hour: '11 AM', orders: 98 },
    { hour: '12 PM', orders: 245 },
    { hour: '1 PM', orders: 178 },
    { hour: '2 PM', orders: 134 },
    { hour: '3 PM', orders: 89 },
    { hour: '4 PM', orders: 67 },
    { hour: '5 PM', orders: 112 },
    { hour: '6 PM', orders: 234 },
    { hour: '7 PM', orders: 198 },
    { hour: '8 PM', orders: 156 },
    { hour: '9 PM', orders: 89 }
  ],

  // Customer Metrics
  customerMetrics: {
    totalCustomers: 12845,
    newCustomers: 2134,
    returningRate: 83.4,
    avgFrequency: 3.2,
    satisfaction: 4.7
  }
};
