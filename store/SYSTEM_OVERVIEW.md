# Ribshack Store Dashboard - System Overview

## 🏗️ Project Structure

```
/src/app/
├── App.tsx                     # Main application entry point (TSX - protected file)
├── routes.js                   # React Router configuration with protected routes
│
├── /components/                # Reusable UI components
│   ├── Layout.jsx             # Main layout with sidebar navigation
│   ├── NotificationBell.jsx   # Notification dropdown component
│   └── DashboardCard.jsx      # Reusable dashboard card component
│
├── /pages/                    # Page components (one for each route)
│   ├── LoginPage.jsx          # Branch login page
│   ├── DashboardPage.jsx      # Main dashboard with analytics
│   ├── KitchenDisplayPage.jsx # Kitchen Display System (KDS)
│   ├── InventoryPage.jsx      # Inventory management & restock requests
│   ├── MenuManagementPage.jsx # Toggle menu item availability
│   └── StaffRosterPage.jsx    # Staff schedule and roster
│
├── /context/                  # React Context providers for state management
│   ├── AuthContext.jsx        # Authentication state
│   ├── OrderContext.jsx       # Orders state and management
│   ├── InventoryContext.jsx   # Inventory and restock requests
│   └── NotificationContext.jsx # Notifications state
│
├── /data/                     # Mock JSON data (simulating backend responses)
│   ├── dashboard.json         # Dashboard statistics and analytics
│   ├── orders.json            # Order data for Kitchen Display
│   ├── inventory.json         # Inventory items and restock requests
│   ├── menu.json              # Product catalog with availability
│   ├── staff.json             # Staff roster and shift information
│   └── notifications.json     # System notifications
│
├── /utils/                    # Utility functions
│   ├── formatters.js          # Formatting functions (currency, dates, etc.)
│   └── helpers.js             # Helper functions (storage, filters, etc.)
│
└── /tables/                   # Backend database schema
    └── schema.sql             # PostgreSQL table definitions
```

## 🎯 Key Features

### 1. **Login & Authentication** (`/login`)
- Branch-specific credentials (no registration allowed)
- Demo credentials:
  - Username: `sm_bacolod_user`
  - Password: `ribshack123`
- Redirects to dashboard after successful login
- Protected routes with authentication check

### 2. **Main Dashboard** (`/`)
- Today's gross revenue display
- Total orders (dine-in vs delivery)
- Average order value
- Bestseller of the day with image
- Sales by category (Pork, Chicken, Beef, Korean BBQ, Seafood, Drinks)
- Hourly revenue chart (interactive bar chart)
- Recent activity feed

### 3. **Kitchen Display System** (`/kitchen`)
- Live order queue with status filters
- Order statuses: Pending → On Grill → Ready → Dispatched → Completed
- Color-coded status badges
- Timer tracking for each order
- Special instructions display
- One-click status updates
- Urgent order highlighting (when over estimated time)

### 4. **Inventory & Supplies** (`/inventory`)
- Current stock levels with visual indicators
- Status badges: Adequate, Low, Critical
- Stock progress bars
- Low stock alerts
- Restock request system
- Request tracking (Pending, Approved, Declined)
- Admin response display
- Urgency levels: Low, Normal, High, Critical

### 5. **Local Menu Management** (`/menu`)
- Category filtering (All, Pork, Chicken, Beef, Korean BBQ, Seafood, Drinks)
- Toggle availability status per item
- Visual "SOLD OUT" overlay for unavailable items
- Product images and pricing
- "Includes Unli-Rice" badges
- Unavailable reason display

### 6. **Staff Roster** (`/staff`)
- Current shift overview
- On-duty staff with check-in times
- Scheduled staff for later shifts
- Role-based color coding (Manager, Griller, Cashier, Rider)
- Contact information (phone, email)
- Staff profile pictures
- Shift timing display

## 📦 Context API State Management

### AuthContext
- User authentication state
- Branch information
- Login/logout functions
- Protected route access control

### OrderContext
- All orders data
- Order filtering by status
- Order status updates
- Kitchen queue management

### InventoryContext
- Inventory items with stock levels
- Low stock item tracking
- Restock request creation
- Request status tracking

### NotificationContext
- Real-time notifications
- Unread count tracking
- Mark as read functionality
- Notification types: New Order, Admin Response, Low Stock, System Alert

## 🎨 Design Features

- **Color Scheme**: Orange and red gradients (matching Ribshack branding)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Tailwind CSS**: Utility-first styling with Tailwind v4
- **Lucide Icons**: Modern icon library for UI elements
- **Philippine Format**: Currency (₱) and phone numbers (+63)

## 🔐 Login Credentials

**SM Bacolod Branch:**
- Username: `sm_bacolod_user`
- Password: `ribshack123`

## 🗄️ Database Schema

The `/tables/schema.sql` file contains complete PostgreSQL table definitions for:
- branches
- store_users
- orders & order_items
- products
- inventory
- restock_requests
- branch_menu_availability
- staff_roster
- daily_sales_summary
- notifications

## 🚀 How to Use

1. **Login**: Start at `/login` with the demo credentials
2. **Dashboard**: View today's performance metrics
3. **Kitchen**: Manage incoming orders and update status
4. **Inventory**: Check stock levels and request restocks
5. **Menu**: Toggle item availability based on stock
6. **Staff**: View current shift roster

## 🎯 System Flow

1. **Order Flow**: Pending → On Grill → Ready → Dispatched → Completed
2. **Restock Flow**: Low Stock Alert → Create Request → Admin Approval → Restock
3. **Staff Flow**: Scheduled → Check In → On Duty → Check Out

## 📱 Notifications

Real-time notifications appear in the top-right bell icon:
- 🛒 New Order Received
- ✅ Admin Approved Request
- ⚠️ Low Inventory Alert
- 📢 System Alerts

## 🎨 Status Color Codes

**Order Status:**
- Yellow: Pending
- Orange: On Grill
- Green: Ready
- Blue: Dispatched
- Gray: Completed

**Inventory Status:**
- Green: Adequate
- Yellow: Low
- Red: Critical

**Staff Roles:**
- Purple: Manager
- Orange: Griller
- Blue: Cashier
- Green: Rider

---

**Built for**: Ribshack Store Dashboard (Branch Operations)
**System Type**: Frontend-only with mock data (ready for backend integration)
**Tech Stack**: React, React Router, Context API, Tailwind CSS, Lucide Icons
