// Branch data with complete Philippine locations
export const cities = [
  // Visayas
  'Bacolod', 'Cebu', 'Iloilo', 'Roxas', 'Ormoc', 'Lapu-Lapu',
  // Mindanao
  'Davao', 'General Santos', 'Cotabato', 'Butuan', 'Zamboanga', 'Koronadal',
  // Luzon & Metro Manila
  'Manila', 'Caloocan', 'Puerto Princesa'
];

export const regions = [
  { id: 'visayas', name: 'Visayas', color: '#10b981' },
  { id: 'mindanao', name: 'Mindanao', color: '#f59e0b' },
  { id: 'luzon', name: 'Luzon & Metro Manila', color: '#3b82f6' }
];

export const initialBranches = [
  // VISAYAS REGION
  {
    id: 1,
    name: 'SM City Bacolod',
    location: 'South Wing, South Building, SM City Bacolod',
    city: 'Bacolod',
    region: 'visayas',
    manager: 'Maria Santos',
    phone: '+63 34 433 8888',
    username: 'sm.bacolod',
    dailyRevenue: 45200,
    orders: 87,
    status: 'open'
  },
  {
    id: 2,
    name: '888 Chinatown Square',
    location: '888 Chinatown Square Premier, Bacolod',
    city: 'Bacolod',
    region: 'visayas',
    manager: 'Juan Dela Cruz',
    phone: '+63 34 433 9999',
    username: 'chinatown.bacolod',
    dailyRevenue: 38500,
    orders: 72,
    status: 'open'
  },
  {
    id: 3,
    name: 'Ayala Capitol Central',
    location: 'Ayala Malls Capitol Central, Bacolod',
    city: 'Bacolod',
    region: 'visayas',
    manager: 'Rosa Valdez',
    phone: '+63 34 433 7777',
    username: 'ayala.bacolod',
    dailyRevenue: 42800,
    orders: 79,
    status: 'open'
  },
  {
    id: 4,
    name: 'SM Seaside Cebu',
    location: '2nd Floor, SM Seaside City Cebu',
    city: 'Cebu',
    region: 'visayas',
    manager: 'Carlos Reyes',
    phone: '+63 32 888 8000',
    username: 'seaside.cebu',
    dailyRevenue: 52300,
    orders: 94,
    status: 'open'
  },
  {
    id: 5,
    name: 'SM City Cebu',
    location: 'Lower Ground Floor, SM City Cebu',
    city: 'Cebu',
    region: 'visayas',
    manager: 'Anna Lim',
    phone: '+63 32 888 8001',
    username: 'smcity.cebu',
    dailyRevenue: 48900,
    orders: 88,
    status: 'open'
  },
  {
    id: 6,
    name: 'Robinsons Galleria Cebu',
    location: 'Robinsons Galleria Cebu (10th Branch Milestone)',
    city: 'Cebu',
    region: 'visayas',
    manager: 'Miguel Torres',
    phone: '+63 32 888 8002',
    username: 'robinsons.cebu',
    dailyRevenue: 44500,
    orders: 81,
    status: 'open'
  },
  {
    id: 7,
    name: 'SM Hypermarket Lapu-Lapu',
    location: 'SM Hypermarket Lapu-Lapu',
    city: 'Lapu-Lapu',
    region: 'visayas',
    manager: 'Patricia Cruz',
    phone: '+63 32 888 8003',
    username: 'hypermarket.lapu',
    dailyRevenue: 36200,
    orders: 68,
    status: 'open'
  },
  {
    id: 8,
    name: 'SM City Iloilo',
    location: 'Main Building, Mandurriao, SM City Iloilo',
    city: 'Iloilo',
    region: 'visayas',
    manager: 'Roberto Garcia',
    phone: '+63 33 508 5000',
    username: 'smcity.iloilo',
    dailyRevenue: 39800,
    orders: 74,
    status: 'open'
  },
  {
    id: 9,
    name: 'SM City Roxas',
    location: 'Arnaldo Boulevard, SM City Roxas, Capiz',
    city: 'Roxas',
    region: 'visayas',
    manager: 'Elena Morales',
    phone: '+63 36 621 3000',
    username: 'smcity.roxas',
    dailyRevenue: 28400,
    orders: 56,
    status: 'open'
  },
  {
    id: 10,
    name: 'SM Center Ormoc',
    location: 'Real St., SM Center Ormoc, Leyte',
    city: 'Ormoc',
    region: 'visayas',
    manager: 'Fernando Santos',
    phone: '+63 53 561 2000',
    username: 'smcenter.ormoc',
    dailyRevenue: 26800,
    orders: 52,
    status: 'open'
  },

  // MINDANAO REGION
  {
    id: 11,
    name: 'SM Lanang Premier',
    location: 'North Wing, SM Lanang Premier, Davao (Largest Branch)',
    city: 'Davao',
    region: 'mindanao',
    manager: 'Antonio Ramos',
    phone: '+63 82 234 5000',
    username: 'lanang.davao',
    dailyRevenue: 58700,
    orders: 102,
    status: 'open'
  },
  {
    id: 12,
    name: 'SM City General Santos',
    location: '2nd Floor, SM City General Santos',
    city: 'General Santos',
    region: 'mindanao',
    manager: 'Gloria Mendoza',
    phone: '+63 83 552 3000',
    username: 'smcity.gensan',
    dailyRevenue: 41200,
    orders: 76,
    status: 'open'
  },
  {
    id: 13,
    name: 'KCC Mall of Marbel',
    location: 'KCC Mall of Marbel, Koronadal',
    city: 'Koronadal',
    region: 'mindanao',
    manager: 'Vicente Lopez',
    phone: '+63 83 228 4000',
    username: 'kcc.marbel',
    dailyRevenue: 35600,
    orders: 67,
    status: 'open'
  },
  {
    id: 14,
    name: 'KCC Mall of Cotabato',
    location: 'KCC Mall of Cotabato (Pork-Free Branch)',
    city: 'Cotabato',
    region: 'mindanao',
    manager: 'Aisha Rahman',
    phone: '+63 64 421 3000',
    username: 'kcc.cotabato',
    dailyRevenue: 33400,
    orders: 64,
    status: 'open',
    special: 'pork-free'
  },
  {
    id: 15,
    name: 'SM City Butuan',
    location: 'J.C. Aquino Ave., SM City Butuan',
    city: 'Butuan',
    region: 'mindanao',
    manager: 'Rafael Silva',
    phone: '+63 85 815 2000',
    username: 'smcity.butuan',
    dailyRevenue: 37900,
    orders: 71,
    status: 'open'
  },
  {
    id: 16,
    name: 'SM City Zamboanga',
    location: 'Vitaliano Agan Ave., SM City Zamboanga',
    city: 'Zamboanga',
    region: 'mindanao',
    manager: 'Carmen Flores',
    phone: '+63 62 991 2000',
    username: 'smcity.zamboanga',
    dailyRevenue: 34200,
    orders: 65,
    status: 'open'
  },

  // LUZON & METRO MANILA REGION
  {
    id: 17,
    name: 'College Point Manila',
    location: 'Taft Avenue, Malate, Manila (Student Favorite)',
    city: 'Manila',
    region: 'luzon',
    manager: 'Isabella Cruz',
    phone: '+63 2 8523 4000',
    username: 'collegepoint.manila',
    dailyRevenue: 46800,
    orders: 92,
    status: 'open'
  },
  {
    id: 18,
    name: 'SM Center Sangandaan',
    location: 'SM Center Sangandaan, Caloocan',
    city: 'Caloocan',
    region: 'luzon',
    manager: 'Diego Martinez',
    phone: '+63 2 8365 2000',
    username: 'sangandaan.caloocan',
    dailyRevenue: 39500,
    orders: 75,
    status: 'open'
  },
  {
    id: 19,
    name: 'SM Grand Central',
    location: 'SM City Grand Central, Caloocan',
    city: 'Caloocan',
    region: 'luzon',
    manager: 'Sofia Hernandez',
    phone: '+63 2 8712 3000',
    username: 'grandcentral.caloocan',
    dailyRevenue: 41800,
    orders: 78,
    status: 'open'
  },
  {
    id: 20,
    name: 'SM City Puerto Princesa',
    location: 'Malvar Road, SM City Puerto Princesa, Palawan',
    city: 'Puerto Princesa',
    region: 'luzon',
    manager: 'Marco Rivera',
    phone: '+63 48 434 2000',
    username: 'smcity.palawan',
    dailyRevenue: 32600,
    orders: 63,
    status: 'open'
  }
];
