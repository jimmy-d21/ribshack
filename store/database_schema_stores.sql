-- ============================================
-- RIBSHACK RESTAURANT MANAGEMENT SYSTEM
-- DATABASE SCHEMA FOR STORE/BRANCH MANAGEMENT
-- Version: 1.0
-- Date: March 28, 2026
-- ============================================

-- This schema includes tables for Admin Dashboard to manage multiple stores/branches

-- ============================================
-- TABLE: stores
-- Description: Master table for all restaurant branches/stores
-- ============================================
CREATE TABLE stores (
    store_id SERIAL PRIMARY KEY,
    branch_code VARCHAR(50) UNIQUE NOT NULL,
    branch_name VARCHAR(100) NOT NULL,
    branch_display_name VARCHAR(100) NOT NULL,
    
    -- Location Information
    full_address TEXT NOT NULL,
    short_address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    zip_code VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Contact Information
    phone_number VARCHAR(20),
    mobile_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    manager_email VARCHAR(100),
    
    -- Store Manager (FK to users table)
    store_manager_id INTEGER REFERENCES users(user_id),
    
    -- Store Details
    status VARCHAR(30) NOT NULL DEFAULT 'active', -- active, temporarily_closed, permanently_closed, under_construction
    store_type VARCHAR(30) NOT NULL, -- mall, standalone, food_court, kiosk
    seating_capacity INTEGER,
    has_delivery BOOLEAN DEFAULT true,
    has_takeout BOOLEAN DEFAULT true,
    has_dine_in BOOLEAN DEFAULT true,
    
    -- Store Features (Array or JSON)
    features TEXT[], -- e.g., ['unli_rice', 'korean_bbq', 'wifi', 'airconditioned', 'parking']
    
    -- Media
    image_url TEXT,
    additional_images TEXT[], -- Array of image URLs
    
    -- Dates
    opened_date DATE,
    closed_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(user_id),
    updated_by INTEGER REFERENCES users(user_id)
);

-- Indexes for faster queries
CREATE INDEX idx_stores_branch_code ON stores(branch_code);
CREATE INDEX idx_stores_status ON stores(status);
CREATE INDEX idx_stores_city ON stores(city);
CREATE INDEX idx_stores_region ON stores(region);
CREATE INDEX idx_stores_manager ON stores(store_manager_id);

-- ============================================
-- TABLE: store_operating_hours
-- Description: Operating hours for each store
-- ============================================
CREATE TABLE store_operating_hours (
    hours_id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(store_id) ON DELETE CASCADE,
    day_of_week VARCHAR(10) NOT NULL, -- monday, tuesday, wednesday, etc.
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    is_open BOOLEAN DEFAULT true,
    
    UNIQUE(store_id, day_of_week)
);

CREATE INDEX idx_store_hours_store ON store_operating_hours(store_id);

-- ============================================
-- TABLE: store_special_hours
-- Description: Special hours for holidays or events
-- ============================================
CREATE TABLE store_special_hours (
    special_hours_id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(store_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    reason VARCHAR(255), -- e.g., "Christmas Day", "Store Anniversary", "Maintenance"
    is_closed BOOLEAN DEFAULT false,
    open_time TIME,
    close_time TIME,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_special_hours_store ON store_special_hours(store_id);
CREATE INDEX idx_special_hours_date ON store_special_hours(date);

-- ============================================
-- TABLE: store_managers_history
-- Description: Track manager changes for each store
-- ============================================
CREATE TABLE store_managers_history (
    history_id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(store_id) ON DELETE CASCADE,
    manager_id INTEGER NOT NULL REFERENCES users(user_id),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT true,
    notes TEXT,
    assigned_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_managers_history_store ON store_managers_history(store_id);
CREATE INDEX idx_managers_history_manager ON store_managers_history(manager_id);

-- ============================================
-- TABLE: store_performance
-- Description: Daily performance metrics for each store
-- ============================================
CREATE TABLE store_performance (
    performance_id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(store_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    
    -- Revenue Metrics
    gross_revenue DECIMAL(12, 2) DEFAULT 0.00,
    net_revenue DECIMAL(12, 2) DEFAULT 0.00,
    
    -- Order Metrics
    total_orders INTEGER DEFAULT 0,
    dine_in_orders INTEGER DEFAULT 0,
    delivery_orders INTEGER DEFAULT 0,
    takeout_orders INTEGER DEFAULT 0,
    
    -- Customer Metrics
    total_customers INTEGER DEFAULT 0,
    avg_order_value DECIMAL(10, 2) DEFAULT 0.00,
    
    -- Operational Metrics
    staff_on_duty INTEGER DEFAULT 0,
    peak_hour_start TIME,
    peak_hour_end TIME,
    
    -- Created/Updated
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(store_id, date)
);

CREATE INDEX idx_performance_store ON store_performance(store_id);
CREATE INDEX idx_performance_date ON store_performance(date);
CREATE INDEX idx_performance_store_date ON store_performance(store_id, date);

-- ============================================
-- TABLE: store_inventory_levels
-- Description: Inventory levels per store
-- ============================================
CREATE TABLE store_inventory_levels (
    inventory_level_id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(store_id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES inventory_items(item_id),
    
    current_stock DECIMAL(10, 2) NOT NULL DEFAULT 0,
    minimum_threshold DECIMAL(10, 2) NOT NULL,
    maximum_threshold DECIMAL(10, 2),
    reorder_quantity DECIMAL(10, 2),
    
    status VARCHAR(20) DEFAULT 'adequate', -- adequate, low, critical, overstock
    
    last_restocked_at TIMESTAMP,
    last_restocked_quantity DECIMAL(10, 2),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(store_id, item_id)
);

CREATE INDEX idx_inventory_levels_store ON store_inventory_levels(store_id);
CREATE INDEX idx_inventory_levels_item ON store_inventory_levels(item_id);
CREATE INDEX idx_inventory_levels_status ON store_inventory_levels(status);

-- ============================================
-- TABLE: store_restock_requests
-- Description: Restock requests from stores to admin
-- ============================================
CREATE TABLE store_restock_requests (
    request_id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(store_id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES inventory_items(item_id),
    
    quantity_requested DECIMAL(10, 2) NOT NULL,
    urgency VARCHAR(20) NOT NULL, -- normal, high, critical
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, approved, rejected, fulfilled
    
    request_note TEXT,
    admin_response TEXT,
    
    requested_by INTEGER REFERENCES users(user_id),
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    responded_by INTEGER REFERENCES users(user_id),
    responded_at TIMESTAMP,
    
    fulfilled_at TIMESTAMP,
    delivered_quantity DECIMAL(10, 2)
);

CREATE INDEX idx_restock_store ON store_restock_requests(store_id);
CREATE INDEX idx_restock_status ON store_restock_requests(status);
CREATE INDEX idx_restock_urgency ON store_restock_requests(urgency);

-- ============================================
-- TABLE: inventory_items (Master Inventory List)
-- Description: Master list of all inventory items
-- ============================================
CREATE TABLE inventory_items (
    item_id SERIAL PRIMARY KEY,
    item_code VARCHAR(50) UNIQUE NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    item_type VARCHAR(50) NOT NULL, -- meat, rice, supplies, drinks, ingredients
    unit VARCHAR(20) NOT NULL, -- kg, liters, pieces, sacks, etc.
    description TEXT,
    supplier_id INTEGER REFERENCES suppliers(supplier_id),
    standard_cost DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inventory_items_type ON inventory_items(item_type);
CREATE INDEX idx_inventory_items_code ON inventory_items(item_code);

-- ============================================
-- TABLE: suppliers
-- Description: Supplier information
-- ============================================
CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    supplier_code VARCHAR(50) UNIQUE NOT NULL,
    supplier_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    phone_number VARCHAR(20),
    mobile_number VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    payment_terms VARCHAR(50), -- e.g., "Net 30", "COD", "Net 15"
    status VARCHAR(20) DEFAULT 'active', -- active, inactive
    rating DECIMAL(3, 2), -- 0.00 to 5.00
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_suppliers_status ON suppliers(status);

-- ============================================
-- TABLE: store_staff_assignments
-- Description: Staff assigned to each store
-- ============================================
CREATE TABLE store_staff_assignments (
    assignment_id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(store_id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    role VARCHAR(50) NOT NULL, -- manager, griller, cashier, rider, server
    assignment_start_date DATE NOT NULL,
    assignment_end_date DATE,
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    assigned_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(store_id, user_id, assignment_start_date)
);

CREATE INDEX idx_staff_assignments_store ON store_staff_assignments(store_id);
CREATE INDEX idx_staff_assignments_user ON store_staff_assignments(user_id);
CREATE INDEX idx_staff_assignments_active ON store_staff_assignments(is_active);

-- ============================================
-- TABLE: users (Referenced by other tables)
-- Description: System users (admins, managers, staff)
-- ============================================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mobile_number VARCHAR(20),
    role VARCHAR(30) NOT NULL, -- admin, store_manager, griller, cashier, rider, server
    is_active BOOLEAN DEFAULT true,
    profile_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- TABLE: orders (Referenced for performance tracking)
-- Description: All orders across all stores
-- ============================================
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(store_id),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20),
    customer_email VARCHAR(100),
    
    order_type VARCHAR(20) NOT NULL, -- dine-in, delivery, takeout
    status VARCHAR(30) NOT NULL, -- pending, on_grill, ready, dispatched, completed, cancelled
    
    total_amount DECIMAL(10, 2) NOT NULL,
    special_instructions TEXT,
    
    order_received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estimated_ready_time TIMESTAMP,
    completed_at TIMESTAMP,
    
    created_by INTEGER REFERENCES users(user_id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_store ON orders(store_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_received_at ON orders(order_received_at);
CREATE INDEX idx_orders_number ON orders(order_number);

-- ============================================
-- VIEWS FOR ADMIN DASHBOARD
-- ============================================

-- View: Store Performance Summary
CREATE VIEW v_store_performance_summary AS
SELECT 
    s.store_id,
    s.branch_code,
    s.branch_name,
    s.city,
    s.status,
    sp.date,
    sp.gross_revenue,
    sp.total_orders,
    sp.avg_order_value,
    sm.full_name as manager_name,
    sm.email as manager_email
FROM stores s
LEFT JOIN store_performance sp ON s.store_id = sp.store_id AND sp.date = CURRENT_DATE
LEFT JOIN users sm ON s.store_manager_id = sm.user_id;

-- View: Store Inventory Status
CREATE VIEW v_store_inventory_status AS
SELECT 
    s.store_id,
    s.branch_code,
    s.branch_name,
    ii.item_name,
    ii.item_type,
    sil.current_stock,
    sil.minimum_threshold,
    sil.status,
    ii.unit
FROM stores s
JOIN store_inventory_levels sil ON s.store_id = sil.store_id
JOIN inventory_items ii ON sil.item_id = ii.item_id
WHERE sil.status IN ('low', 'critical');

-- View: Pending Restock Requests
CREATE VIEW v_pending_restock_requests AS
SELECT 
    srr.request_id,
    s.branch_code,
    s.branch_name,
    ii.item_name,
    srr.quantity_requested,
    ii.unit,
    srr.urgency,
    srr.status,
    srr.request_note,
    u.full_name as requested_by_name,
    srr.requested_at
FROM store_restock_requests srr
JOIN stores s ON srr.store_id = s.store_id
JOIN inventory_items ii ON srr.item_id = ii.item_id
JOIN users u ON srr.requested_by = u.user_id
WHERE srr.status = 'pending'
ORDER BY 
    CASE srr.urgency 
        WHEN 'critical' THEN 1
        WHEN 'high' THEN 2
        WHEN 'normal' THEN 3
    END,
    srr.requested_at ASC;

-- ============================================
-- SAMPLE DATA INSERT STATEMENTS
-- ============================================

-- Insert sample inventory items
INSERT INTO inventory_items (item_code, item_name, item_type, unit, standard_cost) VALUES
('MEAT-001', 'Pork Spareribs', 'meat', 'kg', 350.00),
('MEAT-002', 'Chicken Quarters', 'meat', 'kg', 180.00),
('MEAT-003', 'Beef Sirloin', 'meat', 'kg', 480.00),
('RICE-001', 'Rice', 'rice', 'sacks', 2500.00),
('SUPPLY-001', 'BBQ Sticks', 'supplies', 'pieces', 0.50),
('SUPPLY-002', 'BBQ Sauce', 'supplies', 'liters', 120.00),
('DRINK-001', 'Coke', 'drinks', 'pieces', 25.00),
('DRINK-002', 'Iced Tea Mix', 'drinks', 'liters', 80.00);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update trigger to all relevant tables
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON stores
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_items_updated_at BEFORE UPDATE ON inventory_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_store_inventory_levels_updated_at BEFORE UPDATE ON store_inventory_levels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- PERMISSIONS (Example - adjust based on your needs)
-- ============================================

-- Grant permissions to admin role
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ribshack_admin;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ribshack_admin;

-- Grant read-only permissions to store_manager role
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO ribshack_store_manager;
-- GRANT UPDATE, INSERT ON orders, store_restock_requests TO ribshack_store_manager;

-- ============================================
-- END OF SCHEMA
-- ============================================
