# RIBSHACK ADMIN DASHBOARD - STORE MANAGEMENT API

## Overview
This document outlines the API endpoints for the Admin Dashboard to manage multiple stores/branches in the Ribshack restaurant system.

---

## BASE URL
```
https://api.ribshack.ph/v1
```

---

## AUTHENTICATION
All API requests require authentication using JWT tokens.

```http
Authorization: Bearer {access_token}
```

---

## 1. STORE MANAGEMENT ENDPOINTS

### 1.1 Get All Stores
Retrieve a list of all stores with optional filtering.

**Endpoint:** `GET /stores`

**Query Parameters:**
- `status` (optional): Filter by status (active, temporarily_closed, permanently_closed)
- `city` (optional): Filter by city
- `region` (optional): Filter by region
- `store_type` (optional): Filter by type (mall, standalone, food_court)

**Example Request:**
```http
GET /stores?status=active&city=Bacolod
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stores": [
      {
        "storeId": 1,
        "branchCode": "sm_bacolod",
        "branchName": "SM Bacolod",
        "location": {
          "city": "Bacolod",
          "province": "Negros Occidental",
          "fullAddress": "South Wing, South Building, SM City Bacolod"
        },
        "status": "active",
        "storeManager": {
          "userId": 1,
          "fullName": "Juan Manager",
          "email": "juan.manager@ribshack.ph"
        }
      }
    ],
    "total": 5,
    "page": 1,
    "perPage": 20
  }
}
```

---

### 1.2 Get Store by ID
Retrieve detailed information about a specific store.

**Endpoint:** `GET /stores/:storeId`

**Example Request:**
```http
GET /stores/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "storeId": 1,
    "branchCode": "sm_bacolod",
    "branchName": "SM Bacolod",
    "location": {
      "fullAddress": "South Wing, South Building, SM City Bacolod",
      "city": "Bacolod",
      "province": "Negros Occidental",
      "coordinates": {
        "latitude": 10.6667,
        "longitude": 122.9500
      }
    },
    "contactInfo": {
      "phoneNumber": "+63 34 432 1234",
      "mobileNumber": "+63 917 111 2222",
      "email": "bacolod@ribshack.ph"
    },
    "operatingHours": {
      "monday": { "open": "08:00", "close": "22:00", "isOpen": true },
      "tuesday": { "open": "08:00", "close": "22:00", "isOpen": true }
    },
    "storeManager": {
      "userId": 1,
      "fullName": "Juan Manager",
      "email": "juan.manager@ribshack.ph"
    },
    "status": "active",
    "seatingCapacity": 80,
    "hasDelivery": true,
    "features": ["unli_rice", "korean_bbq", "wifi", "airconditioned"]
  }
}
```

---

### 1.3 Create New Store
Add a new store/branch to the system.

**Endpoint:** `POST /stores`

**Request Body:**
```json
{
  "branchCode": "sm_manila",
  "branchName": "SM Manila",
  "branchDisplayName": "SM City Manila",
  "location": {
    "fullAddress": "3rd Floor, SM City Manila, San Marcelino Street, Manila",
    "shortAddress": "SM City Manila, San Marcelino",
    "city": "Manila",
    "province": "Metro Manila",
    "region": "NCR",
    "zipCode": "1000",
    "coordinates": {
      "latitude": 14.5995,
      "longitude": 120.9842
    }
  },
  "contactInfo": {
    "phoneNumber": "+63 2 8123 4567",
    "mobileNumber": "+63 917 888 9999",
    "email": "manila@ribshack.ph",
    "managerEmail": "manager.manila@ribshack.ph"
  },
  "storeManagerId": 30,
  "status": "active",
  "storeType": "mall",
  "seatingCapacity": 70,
  "hasDelivery": true,
  "hasTakeout": true,
  "hasDineIn": true,
  "features": ["unli_rice", "korean_bbq", "wifi", "airconditioned"],
  "openedDate": "2026-06-01"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Store created successfully",
  "data": {
    "storeId": 6,
    "branchCode": "sm_manila",
    "branchName": "SM Manila",
    "createdAt": "2026-03-28T12:00:00Z"
  }
}
```

---

### 1.4 Update Store
Update store information.

**Endpoint:** `PUT /stores/:storeId`

**Request Body:**
```json
{
  "status": "temporarily_closed",
  "contactInfo": {
    "phoneNumber": "+63 34 432 9999",
    "mobileNumber": "+63 917 111 3333"
  },
  "operatingHours": {
    "monday": { "open": "09:00", "close": "21:00", "isOpen": true }
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Store updated successfully",
  "data": {
    "storeId": 1,
    "updatedAt": "2026-03-28T12:30:00Z"
  }
}
```

---

### 1.5 Delete Store
Permanently or soft delete a store.

**Endpoint:** `DELETE /stores/:storeId`

**Query Parameters:**
- `soft` (optional): If true, sets status to 'permanently_closed' instead of deleting

**Response:**
```json
{
  "success": true,
  "message": "Store deleted successfully"
}
```

---

## 2. STORE PERFORMANCE ENDPOINTS

### 2.1 Get Store Performance
Retrieve performance metrics for a store.

**Endpoint:** `GET /stores/:storeId/performance`

**Query Parameters:**
- `startDate` (optional): Start date (YYYY-MM-DD)
- `endDate` (optional): End date (YYYY-MM-DD)
- `period` (optional): today, week, month, year

**Example Request:**
```http
GET /stores/1/performance?period=week
```

**Response:**
```json
{
  "success": true,
  "data": {
    "storeId": 1,
    "branchName": "SM Bacolod",
    "period": {
      "startDate": "2026-03-22",
      "endDate": "2026-03-28"
    },
    "metrics": {
      "totalRevenue": 317245.50,
      "totalOrders": 609,
      "avgOrderValue": 520.70,
      "dineInOrders": 364,
      "deliveryOrders": 245,
      "customerCount": 1234
    },
    "dailyBreakdown": [
      {
        "date": "2026-03-22",
        "revenue": 45320.50,
        "orders": 87
      },
      {
        "date": "2026-03-23",
        "revenue": 48100.00,
        "orders": 92
      }
    ]
  }
}
```

---

### 2.2 Compare Store Performance
Compare performance across multiple stores.

**Endpoint:** `GET /stores/performance/compare`

**Query Parameters:**
- `storeIds` (required): Comma-separated store IDs
- `startDate` (optional): Start date
- `endDate` (optional): End date

**Example Request:**
```http
GET /stores/performance/compare?storeIds=1,2,3&period=month
```

**Response:**
```json
{
  "success": true,
  "data": {
    "comparison": [
      {
        "storeId": 1,
        "branchName": "SM Bacolod",
        "totalRevenue": 1350000.00,
        "totalOrders": 2590,
        "avgOrderValue": 521.24
      },
      {
        "storeId": 2,
        "branchName": "Ayala Cebu",
        "totalRevenue": 1120000.00,
        "totalOrders": 2340,
        "avgOrderValue": 478.63
      }
    ]
  }
}
```

---

## 3. INVENTORY MANAGEMENT ENDPOINTS

### 3.1 Get Store Inventory
Retrieve inventory levels for a specific store.

**Endpoint:** `GET /stores/:storeId/inventory`

**Query Parameters:**
- `status` (optional): Filter by status (adequate, low, critical)
- `itemType` (optional): Filter by item type

**Response:**
```json
{
  "success": true,
  "data": {
    "storeId": 1,
    "inventory": [
      {
        "itemId": 1,
        "itemName": "Pork Spareribs",
        "itemType": "meat",
        "currentStock": 15.5,
        "unit": "kg",
        "minimumThreshold": 10,
        "status": "adequate",
        "lastRestockedAt": "2026-03-27T08:00:00"
      },
      {
        "itemId": 7,
        "itemName": "Rice",
        "itemType": "rice",
        "currentStock": 3,
        "unit": "sacks",
        "minimumThreshold": 5,
        "status": "critical",
        "lastRestockedAt": "2026-03-24T08:00:00"
      }
    ]
  }
}
```

---

### 3.2 Get All Restock Requests
Retrieve restock requests from all stores.

**Endpoint:** `GET /restock-requests`

**Query Parameters:**
- `status` (optional): pending, approved, rejected, fulfilled
- `urgency` (optional): normal, high, critical
- `storeId` (optional): Filter by specific store

**Response:**
```json
{
  "success": true,
  "data": {
    "requests": [
      {
        "requestId": 1,
        "storeId": 1,
        "branchName": "SM Bacolod",
        "itemName": "Rice",
        "quantityRequested": 10,
        "unit": "sacks",
        "urgency": "critical",
        "status": "pending",
        "requestNote": "Running out fast due to high demand",
        "requestedBy": "Juan Manager",
        "requestedAt": "2026-03-28T09:30:00"
      }
    ],
    "total": 15,
    "pending": 8,
    "approved": 5,
    "fulfilled": 2
  }
}
```

---

### 3.3 Approve Restock Request
Approve a restock request from a store.

**Endpoint:** `POST /restock-requests/:requestId/approve`

**Request Body:**
```json
{
  "adminResponse": "Approved. Delivery scheduled for tomorrow.",
  "approvedQuantity": 10,
  "estimatedDeliveryDate": "2026-03-29"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Restock request approved successfully",
  "data": {
    "requestId": 1,
    "status": "approved",
    "respondedAt": "2026-03-28T14:00:00"
  }
}
```

---

### 3.4 Reject Restock Request
Reject a restock request with reason.

**Endpoint:** `POST /restock-requests/:requestId/reject`

**Request Body:**
```json
{
  "adminResponse": "Insufficient budget. Please reduce quantity."
}
```

---

## 4. STAFF MANAGEMENT ENDPOINTS

### 4.1 Get Store Staff
Retrieve all staff assigned to a store.

**Endpoint:** `GET /stores/:storeId/staff`

**Response:**
```json
{
  "success": true,
  "data": {
    "storeId": 1,
    "staff": [
      {
        "userId": 1,
        "fullName": "Juan Manager",
        "role": "manager",
        "email": "juan.manager@ribshack.ph",
        "mobileNumber": "+63 917 111 2222",
        "assignmentStartDate": "2020-06-01",
        "isActive": true
      },
      {
        "userId": 2,
        "fullName": "Maria Santos",
        "role": "griller",
        "email": "maria.santos@ribshack.ph",
        "assignmentStartDate": "2021-03-15",
        "isActive": true
      }
    ],
    "total": 8
  }
}
```

---

### 4.2 Assign Staff to Store
Assign a user to work at a specific store.

**Endpoint:** `POST /stores/:storeId/staff`

**Request Body:**
```json
{
  "userId": 45,
  "role": "griller",
  "assignmentStartDate": "2026-04-01",
  "notes": "Transferred from BGC branch"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Staff assigned successfully",
  "data": {
    "assignmentId": 123,
    "storeId": 1,
    "userId": 45,
    "assignmentStartDate": "2026-04-01"
  }
}
```

---

### 4.3 Change Store Manager
Assign a new manager to a store.

**Endpoint:** `PUT /stores/:storeId/manager`

**Request Body:**
```json
{
  "newManagerId": 50,
  "effectiveDate": "2026-04-15",
  "notes": "Promotion to store manager"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Store manager updated successfully",
  "data": {
    "storeId": 1,
    "previousManagerId": 1,
    "newManagerId": 50,
    "effectiveDate": "2026-04-15"
  }
}
```

---

## 5. ANALYTICS & REPORTS

### 5.1 Get System-Wide Statistics
Get overall statistics across all stores.

**Endpoint:** `GET /analytics/overview`

**Response:**
```json
{
  "success": true,
  "data": {
    "stores": {
      "total": 5,
      "active": 4,
      "temporarilyClosed": 1,
      "byType": {
        "mall": 3,
        "standalone": 1,
        "foodCourt": 1
      }
    },
    "performance": {
      "totalRevenue": 5640000.00,
      "totalOrders": 10850,
      "avgOrderValue": 519.82
    },
    "topPerformingStore": {
      "storeId": 4,
      "branchName": "BGC Manila",
      "revenue": 1850000.00
    },
    "inventory": {
      "criticalItems": 5,
      "lowStockItems": 12,
      "pendingRequests": 8
    }
  }
}
```

---

### 5.2 Get Revenue Report
Generate revenue report for specified period.

**Endpoint:** `GET /analytics/revenue`

**Query Parameters:**
- `startDate` (required)
- `endDate` (required)
- `groupBy` (optional): day, week, month
- `storeIds` (optional): Comma-separated store IDs

**Response:**
```json
{
  "success": true,
  "data": {
    "period": {
      "startDate": "2026-03-01",
      "endDate": "2026-03-31"
    },
    "totalRevenue": 5640000.00,
    "byStore": [
      {
        "storeId": 1,
        "branchName": "SM Bacolod",
        "revenue": 1350000.00,
        "growth": "+12.5%"
      }
    ],
    "byCategory": [
      {
        "category": "Pork",
        "revenue": 2100000.00,
        "percentage": 37.2
      }
    ]
  }
}
```

---

## ERROR RESPONSES

### Standard Error Format
```json
{
  "success": false,
  "error": {
    "code": "STORE_NOT_FOUND",
    "message": "Store with ID 99 not found",
    "details": {}
  }
}
```

### Common Error Codes
- `STORE_NOT_FOUND` - Store does not exist
- `UNAUTHORIZED` - Missing or invalid authentication
- `FORBIDDEN` - Insufficient permissions
- `VALIDATION_ERROR` - Invalid request data
- `DUPLICATE_BRANCH_CODE` - Branch code already exists
- `MANAGER_ALREADY_ASSIGNED` - Manager already assigned to another store

---

## WEBHOOKS

### Store Status Changed
Triggered when a store's status changes.

**Payload:**
```json
{
  "event": "store.status_changed",
  "timestamp": "2026-03-28T14:00:00Z",
  "data": {
    "storeId": 1,
    "branchCode": "sm_bacolod",
    "previousStatus": "active",
    "newStatus": "temporarily_closed",
    "reason": "Renovation"
  }
}
```

---

## RATE LIMITS
- **Standard:** 1000 requests per hour per API key
- **Burst:** 50 requests per minute

---

## PAGINATION
All list endpoints support pagination:
- `page` (default: 1)
- `perPage` (default: 20, max: 100)

---

## SUPPORT
For API support, contact: **api-support@ribshack.ph**
