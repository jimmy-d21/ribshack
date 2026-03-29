-- RIBSHACK STORE DASHBOARD DATABASE SCHEMA
-- Backend Table Definitions for Branch Operations System

-- ============================================
-- 1. BRANCHES TABLE
-- ============================================
CREATE TABLE branches (
    id SERIAL PRIMARY KEY,
    branch_code VARCHAR(50) UNIQUE NOT NULL,
    branch_name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(100),
    status VARCHAR(20) DEFAULT 'open', -- open, closed, maintenance
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. STORE USERS TABLE
-- ============================================
CREATE TABLE store_users (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- manager, cashier, griller, rider
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    mobile_number VARCHAR(20),
    status VARCHAR(20) DEFAULT 'active', -- active, inactive, suspended
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 3. ORDERS TABLE
-- ============================================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    customer_name VARCHAR(100),
    customer_phone VARCHAR(20),
    customer_address TEXT,
    order_type VARCHAR(20) NOT NULL, -- dine-in, delivery
    payment_method VARCHAR(50), -- COD, GCash, Stripe
    subtotal DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, on_grill, ready, dispatched, completed, cancelled
    special_instructions TEXT,
    estimated_time INTEGER, -- in minutes
    order_received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 4. ORDER ITEMS TABLE
-- ============================================
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    product_name VARCHAR(150) NOT NULL,
    category VARCHAR(50),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    customization TEXT, -- JSON field for options like "Paa", "Pecho"
    includes_unli_rice BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 5. PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_code VARCHAR(50) UNIQUE NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Pork, Chicken, Beef, Korean BBQ, Seafood, Drinks
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    includes_unli_rice BOOLEAN DEFAULT false,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 6. INVENTORY TABLE
-- ============================================
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    item_name VARCHAR(100) NOT NULL,
    item_type VARCHAR(50) NOT NULL, -- meat, rice, drinks, supplies
    current_stock DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL, -- kg, sacks, liters, pieces
    minimum_threshold DECIMAL(10, 2) NOT NULL,
    last_restocked_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(branch_id, item_name)
);

-- ============================================
-- 7. RESTOCK REQUESTS TABLE
-- ============================================
CREATE TABLE restock_requests (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    requested_by INTEGER REFERENCES store_users(id),
    item_name VARCHAR(100) NOT NULL,
    quantity_requested DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    urgency VARCHAR(20) DEFAULT 'normal', -- low, normal, high, critical
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, declined, fulfilled
    request_note TEXT,
    admin_response TEXT,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP,
    fulfilled_at TIMESTAMP
);

-- ============================================
-- 8. BRANCH MENU AVAILABILITY TABLE
-- ============================================
CREATE TABLE branch_menu_availability (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    is_available BOOLEAN DEFAULT true,
    unavailable_reason TEXT,
    updated_by INTEGER REFERENCES store_users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(branch_id, product_id)
);

-- ============================================
-- 9. STAFF ROSTER TABLE
-- ============================================
CREATE TABLE staff_roster (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES store_users(id) ON DELETE CASCADE,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    shift_date DATE NOT NULL,
    shift_start TIME NOT NULL,
    shift_end TIME NOT NULL,
    role VARCHAR(50) NOT NULL, -- griller, cashier, rider
    status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, on_duty, completed, absent
    check_in_time TIMESTAMP,
    check_out_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 10. DAILY SALES SUMMARY TABLE
-- ============================================
CREATE TABLE daily_sales_summary (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    sales_date DATE NOT NULL,
    total_orders INTEGER DEFAULT 0,
    dine_in_orders INTEGER DEFAULT 0,
    delivery_orders INTEGER DEFAULT 0,
    gross_revenue DECIMAL(10, 2) DEFAULT 0,
    net_revenue DECIMAL(10, 2) DEFAULT 0,
    bestseller_product_id INTEGER REFERENCES products(id),
    bestseller_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(branch_id, sales_date)
);

-- ============================================
-- 11. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES store_users(id),
    notification_type VARCHAR(50) NOT NULL, -- new_order, low_stock, admin_response, system_alert
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_orders_branch_id ON orders(branch_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_inventory_branch_id ON inventory(branch_id);
CREATE INDEX idx_staff_roster_date ON staff_roster(shift_date);
CREATE INDEX idx_notifications_branch_user ON notifications(branch_id, user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
