-- RIBSHACK ADMIN DASHBOARD DATABASE SCHEMA
-- Backend Table Definitions for Admin Operations System

-- ============================================
-- 1. ADMIN USERS TABLE
-- ============================================
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- super_admin, admin, manager
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'active', -- active, inactive, suspended
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. BRANCHES TABLE
-- ============================================
CREATE TABLE branches (
    id SERIAL PRIMARY KEY,
    branch_code VARCHAR(50) UNIQUE NOT NULL,
    branch_name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(100),
    manager_id INTEGER,
    status VARCHAR(20) DEFAULT 'open', -- open, closed, maintenance
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 3. PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_code VARCHAR(50) UNIQUE NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active', -- active, inactive, discontinued
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 4. INVENTORY TABLE
-- ============================================
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0,
    min_stock INTEGER DEFAULT 10,
    max_stock INTEGER DEFAULT 100,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(branch_id, product_id)
);

-- ============================================
-- 5. SALES TABLE
-- ============================================
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 6. SALE ITEMS TABLE
-- ============================================
CREATE TABLE sale_items (
    id SERIAL PRIMARY KEY,
    sale_id INTEGER REFERENCES sales(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);

-- ============================================
-- 7. FINANCE REPORTS TABLE
-- ============================================
CREATE TABLE finance_reports (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    report_type VARCHAR(50) NOT NULL, -- daily, weekly, monthly
    report_date DATE NOT NULL,
    total_sales DECIMAL(10, 2) DEFAULT 0,
    total_cost DECIMAL(10, 2) DEFAULT 0,
    profit DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 8. REQUESTS TABLE
-- ============================================
CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    request_type VARCHAR(50) NOT NULL, -- inventory, maintenance, staff
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, completed
    requested_by INTEGER REFERENCES admin_users(id),
    approved_by INTEGER REFERENCES admin_users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);