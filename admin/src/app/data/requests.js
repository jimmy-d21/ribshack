export const initialRequests = [
  {
    id: 1,
    branch: 'Lacson Street',
    branchId: 2,
    type: 'Restock',
    items: [
      { item: 'Rice Sacks', quantity: 10, unit: 'sacks' },
      { item: 'Pork Spare Ribs', quantity: 25, unit: 'kg' }
    ],
    priority: 'high',
    requestedAt: '2026-03-27 09:15 AM',
    status: 'pending',
    notes: 'Running low on rice. Need urgent delivery for lunch rush.'
  },
  {
    id: 2,
    branch: 'SM Bacolod',
    branchId: 1,
    type: 'Restock',
    items: [
      { item: 'Chicken (Whole)', quantity: 15, unit: 'pcs' },
      { item: 'BBQ Sauce', quantity: 5, unit: 'liters' }
    ],
    priority: 'medium',
    requestedAt: '2026-03-27 08:30 AM',
    status: 'pending',
    notes: 'Regular weekly restock for chicken inasal.'
  },
  {
    id: 3,
    branch: 'Iloilo City Mall',
    branchId: 3,
    type: 'Restock',
    items: [
      { item: 'Blue Marlin', quantity: 8, unit: 'kg' },
      { item: 'Squid', quantity: 5, unit: 'kg' },
      { item: 'Rice Sacks', quantity: 5, unit: 'sacks' }
    ],
    priority: 'high',
    requestedAt: '2026-03-27 07:45 AM',
    status: 'pending',
    notes: 'Seafood special promotion this weekend. Need fresh stock.'
  },
  {
    id: 4,
    branch: 'SM Bacolod',
    branchId: 1,
    type: 'Restock',
    items: [
      { item: 'Korean BBQ Marinade', quantity: 3, unit: 'liters' }
    ],
    priority: 'low',
    requestedAt: '2026-03-26 04:20 PM',
    status: 'approved',
    notes: 'Approved for delivery tomorrow morning.',
    respondedAt: '2026-03-26 05:15 PM',
    adminNotes: 'Scheduled with supplier. ETA: March 27, 10 AM'
  },
  {
    id: 5,
    branch: 'Lacson Street',
    branchId: 2,
    type: 'Restock',
    items: [
      { item: 'Beef Brisket', quantity: 20, unit: 'kg' }
    ],
    priority: 'medium',
    requestedAt: '2026-03-26 02:10 PM',
    status: 'declined',
    notes: 'Need more beef for weekend orders.',
    respondedAt: '2026-03-26 03:00 PM',
    adminNotes: 'Supplier out of stock. Alternative source will be ready next week.'
  }
];
