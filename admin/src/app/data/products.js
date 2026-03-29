export const initialProducts = [
  // Pork
  { id: 1, name: 'Pork Spare Ribs', category: 'Pork', price: 199, unliRice: true, description: 'Tender grilled pork ribs with BBQ sauce' },
  { id: 2, name: 'BBQ Pork Skewers (3pcs)', category: 'Pork', price: 89, unliRice: true, description: 'Marinated pork skewers' },
  { id: 3, name: 'Pork Belly Strips', category: 'Pork', price: 149, unliRice: true, description: 'Grilled crispy pork belly' },
  
  // Chicken
  { id: 4, name: 'Chicken Inasal (Pecho)', category: 'Chicken', price: 129, unliRice: true, description: 'Grilled chicken breast marinated in special sauce' },
  { id: 5, name: 'Chicken Inasal (Paa)', category: 'Chicken', price: 119, unliRice: true, description: 'Grilled chicken leg quarter' },
  { id: 6, name: 'BBQ Chicken Wings (5pcs)', category: 'Chicken', price: 99, unliRice: false, description: 'Spicy BBQ wings' },
  
  // Beef
  { id: 7, name: 'Beef Brisket', category: 'Beef', price: 249, unliRice: true, description: 'Slow-grilled beef brisket' },
  { id: 8, name: 'Beef Short Ribs', category: 'Beef', price: 279, unliRice: true, description: 'Premium beef short ribs' },
  
  // Korean BBQ
  { id: 9, name: 'Korean Pork Bulgogi', category: 'Korean BBQ', price: 189, unliRice: true, description: 'Sweet and savory Korean-style pork' },
  { id: 10, name: 'Korean Beef Bulgogi', category: 'Korean BBQ', price: 229, unliRice: true, description: 'Authentic Korean beef bulgogi' },
  
  // Seafood
  { id: 11, name: 'Grilled Blue Marlin', category: 'Seafood', price: 259, unliRice: true, description: 'Fresh blue marlin steak' },
  { id: 12, name: 'Grilled Squid', category: 'Seafood', price: 169, unliRice: true, description: 'Tender grilled squid' },
  { id: 13, name: 'Grilled Prawns (4pcs)', category: 'Seafood', price: 199, unliRice: false, description: 'Large tiger prawns' },
  
  // Drinks
  { id: 14, name: 'Iced Tea (Regular)', category: 'Drinks', price: 39, unliRice: false, description: 'Refreshing iced tea' },
  { id: 15, name: 'Soft Drinks', category: 'Drinks', price: 45, unliRice: false, description: 'Assorted sodas' },
  { id: 16, name: 'Bottled Water', category: 'Drinks', price: 25, unliRice: false, description: 'Purified water' },
];

export const categories = ['Pork', 'Chicken', 'Beef', 'Korean BBQ', 'Seafood', 'Drinks'];

export const categoryIcons = {
  'Pork': '🥓',
  'Chicken': '🍗',
  'Beef': '🥩',
  'Korean BBQ': '🇰🇷',
  'Seafood': '🦐',
  'Drinks': '🥤'
};
