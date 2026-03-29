// Store Dashboard Page Data
// This file contains all data needed for individual store dashboard views

export const storeDashboardData = {
  getStoreDashboardData: (branchId) => {
    const storeData = {
      1: { // SM Bacolod
        branchName: 'SM Bacolod',
        todayStats: {
          revenue: 3200,
          orders: 42,
          avgOrderValue: 762,
          customers: 38
        },
        weeklyRevenue: [
          { day: 'Mon', revenue: 2800, orders: 35 },
          { day: 'Tue', revenue: 2950, orders: 38 },
          { day: 'Wed', revenue: 3100, orders: 40 },
          { day: 'Thu', revenue: 3300, orders: 43 },
          { day: 'Fri', revenue: 3800, orders: 48 },
          { day: 'Sat', revenue: 4200, orders: 52 },
          { day: 'Sun', revenue: 3900, orders: 49 }
        ],
        hourlyOrders: [
          { hour: '10 AM', orders: 2 },
          { hour: '11 AM', orders: 5 },
          { hour: '12 PM', orders: 12 },
          { hour: '1 PM', orders: 8 },
          { hour: '2 PM', orders: 5 },
          { hour: '3 PM', orders: 3 },
          { hour: '4 PM', orders: 2 },
          { hour: '5 PM', orders: 4 },
          { hour: '6 PM', orders: 10 },
          { hour: '7 PM', orders: 7 },
          { hour: '8 PM', orders: 4 }
        ],
        topProducts: [
          { name: 'Chicken Inasal (Pecho)', sold: 28, revenue: 3612 },
          { name: 'Pork Spare Ribs', sold: 22, revenue: 4378 },
          { name: 'BBQ Pork Skewers', sold: 18, revenue: 1602 },
          { name: 'Grilled Blue Marlin', sold: 12, revenue: 3108 },
          { name: 'Korean Pork Bulgogi', sold: 15, revenue: 2835 }
        ],
        orderStatus: {
          completed: 38,
          preparing: 3,
          pending: 1,
          cancelled: 0
        },
        recentOrders: [
          { id: '#1042', time: '2:35 PM', items: 3, total: 567, status: 'completed' },
          { id: '#1041', time: '2:28 PM', items: 2, total: 348, status: 'completed' },
          { id: '#1040', time: '2:15 PM', items: 4, total: 892, status: 'preparing' },
          { id: '#1039', time: '2:05 PM', items: 1, total: 199, status: 'preparing' },
          { id: '#1038', time: '1:58 PM', items: 5, total: 1205, status: 'completed' }
        ],
        inventoryAlerts: [
          { item: 'Rice Sacks', current: 3, minimum: 5, status: 'low' },
          { item: 'BBQ Sauce', current: 2, minimum: 3, status: 'low' }
        ]
      },
      2: { // Lacson Street
        branchName: 'Lacson Street',
        todayStats: {
          revenue: 2800,
          orders: 35,
          avgOrderValue: 800,
          customers: 32
        },
        weeklyRevenue: [
          { day: 'Mon', revenue: 2400, orders: 30 },
          { day: 'Tue', revenue: 2600, orders: 33 },
          { day: 'Wed', revenue: 2750, orders: 35 },
          { day: 'Thu', revenue: 2900, orders: 37 },
          { day: 'Fri', revenue: 3400, orders: 42 },
          { day: 'Sat', revenue: 3800, orders: 47 },
          { day: 'Sun', revenue: 3500, orders: 44 }
        ],
        hourlyOrders: [
          { hour: '10 AM', orders: 1 },
          { hour: '11 AM', orders: 4 },
          { hour: '12 PM', orders: 10 },
          { hour: '1 PM', orders: 7 },
          { hour: '2 PM', orders: 4 },
          { hour: '3 PM', orders: 2 },
          { hour: '4 PM', orders: 1 },
          { hour: '5 PM', orders: 3 },
          { hour: '6 PM', orders: 9 },
          { hour: '7 PM', orders: 6 },
          { hour: '8 PM', orders: 3 }
        ],
        topProducts: [
          { name: 'Pork Spare Ribs', sold: 25, revenue: 4975 },
          { name: 'Chicken Inasal (Paa)', sold: 20, revenue: 2380 },
          { name: 'Korean Beef Bulgogi', sold: 14, revenue: 3206 },
          { name: 'BBQ Chicken Wings', sold: 16, revenue: 1584 },
          { name: 'Grilled Squid', sold: 10, revenue: 1690 }
        ],
        orderStatus: {
          completed: 32,
          preparing: 2,
          pending: 1,
          cancelled: 0
        },
        recentOrders: [
          { id: '#2035', time: '2:42 PM', items: 2, total: 428, status: 'completed' },
          { id: '#2034', time: '2:30 PM', items: 3, total: 647, status: 'completed' },
          { id: '#2033', time: '2:18 PM', items: 2, total: 398, status: 'preparing' },
          { id: '#2032', time: '2:10 PM', items: 4, total: 956, status: 'completed' },
          { id: '#2031', time: '1:55 PM', items: 1, total: 199, status: 'completed' }
        ],
        inventoryAlerts: [
          { item: 'Pork Spare Ribs', current: 8, minimum: 10, status: 'low' },
          { item: 'Rice Sacks', current: 4, minimum: 5, status: 'low' },
          { item: 'Iced Tea', current: 1, minimum: 3, status: 'critical' }
        ]
      },
      3: { // Iloilo City Mall
        branchName: 'Iloilo City Mall',
        todayStats: {
          revenue: 2500,
          orders: 31,
          avgOrderValue: 806,
          customers: 28
        },
        weeklyRevenue: [
          { day: 'Mon', revenue: 2200, orders: 28 },
          { day: 'Tue', revenue: 2350, orders: 30 },
          { day: 'Wed', revenue: 2500, orders: 32 },
          { day: 'Thu', revenue: 2650, orders: 34 },
          { day: 'Fri', revenue: 3100, orders: 39 },
          { day: 'Sat', revenue: 3500, orders: 44 },
          { day: 'Sun', revenue: 3200, orders: 40 }
        ],
        hourlyOrders: [
          { hour: '10 AM', orders: 1 },
          { hour: '11 AM', orders: 3 },
          { hour: '12 PM', orders: 9 },
          { hour: '1 PM', orders: 6 },
          { hour: '2 PM', orders: 3 },
          { hour: '3 PM', orders: 2 },
          { hour: '4 PM', orders: 1 },
          { hour: '5 PM', orders: 3 },
          { hour: '6 PM', orders: 8 },
          { hour: '7 PM', orders: 5 },
          { hour: '8 PM', orders: 2 }
        ],
        topProducts: [
          { name: 'Grilled Blue Marlin', sold: 18, revenue: 4662 },
          { name: 'Grilled Squid', sold: 15, revenue: 2535 },
          { name: 'Chicken Inasal (Pecho)', sold: 19, revenue: 2451 },
          { name: 'Grilled Prawns', sold: 12, revenue: 2388 },
          { name: 'Pork Belly Strips', sold: 11, revenue: 1639 }
        ],
        orderStatus: {
          completed: 28,
          preparing: 2,
          pending: 1,
          cancelled: 0
        },
        recentOrders: [
          { id: '#3031', time: '2:38 PM', items: 3, total: 727, status: 'completed' },
          { id: '#3030', time: '2:25 PM', items: 2, total: 458, status: 'completed' },
          { id: '#3029', time: '2:12 PM', items: 4, total: 896, status: 'preparing' },
          { id: '#3028', time: '2:05 PM', items: 2, total: 398, status: 'completed' },
          { id: '#3027', time: '1:50 PM', items: 3, total: 587, status: 'completed' }
        ],
        inventoryAlerts: [
          { item: 'Blue Marlin', current: 3, minimum: 5, status: 'low' },
          { item: 'Squid', current: 2, minimum: 5, status: 'critical' }
        ]
      },
      4: { // Ayala Center (Closed today)
        branchName: 'Ayala Center',
        todayStats: {
          revenue: 0,
          orders: 0,
          avgOrderValue: 0,
          customers: 0
        },
        weeklyRevenue: [
          { day: 'Mon', revenue: 2100, orders: 27 },
          { day: 'Tue', revenue: 2250, orders: 29 },
          { day: 'Wed', revenue: 2400, orders: 31 },
          { day: 'Thu', revenue: 2550, orders: 33 },
          { day: 'Fri', revenue: 2900, orders: 37 },
          { day: 'Sat', revenue: 3300, orders: 42 },
          { day: 'Sun', revenue: 0, orders: 0 }
        ],
        hourlyOrders: [],
        topProducts: [
          { name: 'Korean Pork Bulgogi', sold: 0, revenue: 0 },
          { name: 'Beef Brisket', sold: 0, revenue: 0 },
          { name: 'Chicken Inasal (Pecho)', sold: 0, revenue: 0 }
        ],
        orderStatus: {
          completed: 0,
          preparing: 0,
          pending: 0,
          cancelled: 0
        },
        recentOrders: [],
        inventoryAlerts: []
      }
    };

    return storeData[branchId] || storeData[1];
  }
};