// Product Catalog Page Data
// This file contains all data needed for the Product Catalog page

export const productCatalogData = {
  // Product categories
  categories: [
    { id: 'pork', name: 'Pork', icon: '🥓', color: '#ef4444' },
    { id: 'chicken', name: 'Chicken', icon: '🍗', color: '#f59e0b' },
    { id: 'beef', name: 'Beef', icon: '🥩', color: '#dc2626' },
    { id: 'korean-bbq', name: 'Korean BBQ', icon: '🇰🇷', color: '#8b5cf6' },
    { id: 'seafood', name: 'Seafood', icon: '🦐', color: '#3b82f6' },
    { id: 'drinks', name: 'Drinks', icon: '🥤', color: '#10b981' }
  ],

  // All products in the menu
  products: [
    // Pork
    { 
      id: 1, 
      name: 'Pork Spare Ribs', 
      category: 'Pork', 
      price: 199, 
      unliRice: true, 
      available: true,
      description: 'Tender grilled pork ribs with BBQ sauce',
      image: null,
      popular: true
    },
    { 
      id: 2, 
      name: 'BBQ Pork Skewers (3pcs)', 
      category: 'Pork', 
      price: 89, 
      unliRice: true, 
      available: true,
      description: 'Marinated pork skewers',
      image: null,
      popular: true
    },
    { 
      id: 3, 
      name: 'Pork Belly Strips', 
      category: 'Pork', 
      price: 149, 
      unliRice: true, 
      available: true,
      description: 'Grilled crispy pork belly',
      image: null,
      popular: false
    },
    
    // Chicken
    { 
      id: 4, 
      name: 'Chicken Inasal (Pecho)', 
      category: 'Chicken', 
      price: 129, 
      unliRice: true, 
      available: true,
      description: 'Grilled chicken breast marinated in special sauce',
      image: null,
      popular: true
    },
    { 
      id: 5, 
      name: 'Chicken Inasal (Paa)', 
      category: 'Chicken', 
      price: 119, 
      unliRice: true, 
      available: true,
      description: 'Grilled chicken leg quarter',
      image: null,
      popular: true
    },
    { 
      id: 6, 
      name: 'BBQ Chicken Wings (5pcs)', 
      category: 'Chicken', 
      price: 99, 
      unliRice: false, 
      available: true,
      description: 'Spicy BBQ wings',
      image: null,
      popular: false
    },
    
    // Beef
    { 
      id: 7, 
      name: 'Beef Brisket', 
      category: 'Beef', 
      price: 249, 
      unliRice: true, 
      available: true,
      description: 'Slow-grilled beef brisket',
      image: null,
      popular: false
    },
    { 
      id: 8, 
      name: 'Beef Short Ribs', 
      category: 'Beef', 
      price: 279, 
      unliRice: true, 
      available: true,
      description: 'Premium beef short ribs',
      image: null,
      popular: false
    },
    
    // Korean BBQ
    { 
      id: 9, 
      name: 'Korean Pork Bulgogi', 
      category: 'Korean BBQ', 
      price: 189, 
      unliRice: true, 
      available: true,
      description: 'Sweet and savory Korean-style pork',
      image: null,
      popular: true
    },
    { 
      id: 10, 
      name: 'Korean Beef Bulgogi', 
      category: 'Korean BBQ', 
      price: 229, 
      unliRice: true, 
      available: true,
      description: 'Authentic Korean beef bulgogi',
      image: null,
      popular: true
    },
    
    // Seafood
    { 
      id: 11, 
      name: 'Grilled Blue Marlin', 
      category: 'Seafood', 
      price: 259, 
      unliRice: true, 
      available: true,
      description: 'Fresh blue marlin steak',
      image: null,
      popular: true
    },
    { 
      id: 12, 
      name: 'Grilled Squid', 
      category: 'Seafood', 
      price: 169, 
      unliRice: true, 
      available: true,
      description: 'Tender grilled squid',
      image: null,
      popular: false
    },
    { 
      id: 13, 
      name: 'Grilled Prawns (4pcs)', 
      category: 'Seafood', 
      price: 199, 
      unliRice: false, 
      available: true,
      description: 'Large tiger prawns',
      image: null,
      popular: false
    },
    
    // Drinks
    { 
      id: 14, 
      name: 'Iced Tea (Regular)', 
      category: 'Drinks', 
      price: 39, 
      unliRice: false, 
      available: true,
      description: 'Refreshing iced tea',
      image: null,
      popular: false
    },
    { 
      id: 15, 
      name: 'Soft Drinks', 
      category: 'Drinks', 
      price: 45, 
      unliRice: false, 
      available: true,
      description: 'Assorted sodas',
      image: null,
      popular: false
    },
    { 
      id: 16, 
      name: 'Bottled Water', 
      category: 'Drinks', 
      price: 25, 
      unliRice: false, 
      available: true,
      description: 'Purified water',
      image: null,
      popular: false
    }
  ]
};
