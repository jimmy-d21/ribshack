# Data Structure Reference

This file documents the structure of all JSON data files used in the Ribshack Store Dashboard system.

## 📊 dashboard.json

Contains daily analytics and performance metrics.

```json
{
  "today": "YYYY-MM-DD",
  "branchInfo": {
    "branchId": number,
    "branchCode": string,
    "branchName": string,
    "location": string,
    "city": string,
    "status": "open" | "closed"
  },
  "todayStats": {
    "grossRevenue": number,
    "totalOrders": number,
    "dineInOrders": number,
    "deliveryOrders": number,
    "avgOrderValue": number
  },
  "bestsellerOfTheDay": {
    "productId": number,
    "productName": string,
    "category": string,
    "quantitySold": number,
    "revenue": number,
    "imageUrl": string
  },
  "hourlyRevenue": Array<{
    "hour": string,
    "revenue": number
  }>,
  "categorySales": Array<{
    "category": string,
    "revenue": number,
    "orders": number
  }>,
  "recentActivity": Array<{
    "id": number,
    "type": "order_completed" | "inventory_alert" | "staff_checkin",
    "message": string,
    "timestamp": string (ISO 8601)
  }>
}
```

## 🛒 orders.json

Contains all order data for the Kitchen Display System.

```json
{
  "orders": Array<{
    "id": number,
    "orderNumber": string,
    "customerName": string,
    "customerPhone": string,
    "orderType": "delivery" | "dine-in",
    "status": "pending" | "on_grill" | "ready" | "dispatched" | "completed" | "cancelled",
    "items": Array<{
      "productName": string,
      "quantity": number,
      "customization": string | null,
      "includesUnliRice": boolean
    }>,
    "totalAmount": number,
    "specialInstructions": string | null,
    "orderReceivedAt": string (ISO 8601),
    "estimatedTime": number (minutes)
  }>
}
```

## 📦 inventory.json

Contains inventory stock levels and restock requests.

```json
{
  "branchId": number,
  "lastUpdated": string (ISO 8601),
  "inventory": Array<{
    "id": number,
    "itemName": string,
    "itemType": "meat" | "rice" | "supplies" | "drinks",
    "currentStock": number,
    "unit": "kg" | "sacks" | "pieces" | "liters",
    "minimumThreshold": number,
    "status": "adequate" | "low" | "critical",
    "lastRestockedAt": string (ISO 8601)
  }>,
  "restockRequests": Array<{
    "id": number,
    "itemName": string,
    "quantityRequested": number,
    "unit": string,
    "urgency": "low" | "normal" | "high" | "critical",
    "status": "pending" | "approved" | "declined",
    "requestNote": string | null,
    "adminResponse": string | null,
    "requestedAt": string (ISO 8601),
    "respondedAt": string (ISO 8601) | null,
    "requestedBy": string
  }>
}
```

## 🍽️ menu.json

Contains the complete product catalog with availability status.

```json
{
  "products": Array<{
    "id": number,
    "productCode": string,
    "productName": string,
    "category": "Pork" | "Chicken" | "Beef" | "Korean BBQ" | "Seafood" | "Drinks",
    "basePrice": number,
    "includesUnliRice": boolean,
    "isActive": boolean,
    "imageUrl": string,
    "availability": {
      "isAvailable": boolean,
      "unavailableReason": string | null
    }
  }>
}
```

## 👥 staff.json

Contains staff roster and shift information.

```json
{
  "staff": Array<{
    "id": number,
    "userId": number,
    "fullName": string,
    "role": "manager" | "griller" | "cashier" | "rider",
    "email": string,
    "mobileNumber": string,
    "status": "on_duty" | "scheduled" | "off_duty",
    "shiftToday": {
      "shiftStart": string (HH:MM),
      "shiftEnd": string (HH:MM),
      "checkInTime": string (ISO 8601) | null,
      "checkOutTime": string (ISO 8601) | null
    },
    "imageUrl": string
  }>
}
```

## 🔔 notifications.json

Contains system notifications for the branch.

```json
{
  "notifications": Array<{
    "id": number,
    "type": "new_order" | "admin_response" | "low_stock" | "system_alert",
    "title": string,
    "message": string,
    "isRead": boolean,
    "actionUrl": string | null,
    "createdAt": string (ISO 8601)
  }>,
  "unreadCount": number
}
```

## 🎯 Usage Notes

### Date/Time Format
All timestamps use ISO 8601 format: `YYYY-MM-DDTHH:MM:SS`
Example: `2026-03-28T10:50:00`

### Currency
All monetary values are in Philippine Pesos (₱)
Example: `45320.50` represents ₱45,320.50

### Phone Numbers
Philippine format: `+63 XXX XXX XXXX`
Example: `+63 917 123 4567`

### Status Flows

**Order Status Flow:**
```
pending → on_grill → ready → dispatched → completed
                             ↓
                         cancelled
```

**Restock Request Status Flow:**
```
pending → approved → fulfilled
    ↓
  declined
```

**Staff Status Flow:**
```
scheduled → on_duty → off_duty
```

### Adding New Data

To add new orders, inventory items, products, or staff:
1. Navigate to the appropriate JSON file in `/src/app/data/`
2. Follow the structure documented above
3. Ensure all required fields are present
4. Use proper data types (numbers without quotes, booleans as true/false)
5. Maintain consistent ID sequencing

---

**Note:** This is mock data for frontend development. In production, this data would come from a backend API connected to the database defined in `/src/app/tables/schema.sql`.
