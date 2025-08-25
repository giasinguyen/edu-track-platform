# EduTrack API Testing Guide

## 📋 Overview
Comprehensive testing suite cho EduTrack Backend APIs với Postman collection, automated scripts và manual testing guidelines.

## 🚀 Quick Start

### 1. Import vào Postman
```bash
# Import các files sau vào Postman:
- EduTrack-API-Tests.postman_collection.json (Collection)
- EduTrack-Local.postman_environment.json (Environment)
```

### 2. Hoặc chạy automated tests
```bash
# Quick test với cURL
cd EduTrack-BackEnd
./quick-test.bat

# Full test suite với Newman
./run-tests.bat
```

## 📡 API Endpoints Testing

### ✅ Health Check
- **GET** `/health`
- **Expected**: Status 200, response có structure `{code: 0, message: "OK", data: {...}}`

### 📚 Courses API
- **GET** `/api/v1/courses` - List tất cả courses
- **GET** `/api/v1/courses/{id}` - Get course by ID
- **Expected**: 3 default courses (EN/Math/IT)

### 👥 Leads API
- **POST** `/api/v1/leads` - Tạo lead mới
- **Test Cases**:
  - ✅ Valid lead creation
  - ❌ Duplicate email (409 Conflict)
  - ❌ Validation errors (400 Bad Request)

### 🛒 Orders API
- **POST** `/api/v1/orders` - Tạo order
- **Test Cases**:
  - ✅ Order với leadId
  - ✅ Guest checkout (không cần lead)
  - **Expected**: Status PAID (giả lập payment)

### 📊 Analytics API
- **POST** `/api/v1/track` - Track traffic events
- **GET** `/api/v1/admin/dashboard` - Dashboard KPIs
  - Default: Last 7 days
  - Custom: `?from=YYYY-MM-DD&to=YYYY-MM-DD`

## 🧪 Test Scenarios

### Scenario 1: Complete User Journey
1. Health check → Get courses → Create lead → Create order → Track events → Dashboard

### Scenario 2: Error Handling
1. Invalid data validation
2. Duplicate email handling
3. Resource not found (course ID không tồn tại)

### Scenario 3: Analytics Flow
1. Generate multiple traffic events
2. Create leads và orders
3. Check dashboard metrics
4. Validate KPI calculations

## 📈 Expected Dashboard Metrics

```json
{
  "traffic": "Number of track events",
  "leads": "Number of leads created", 
  "orders": "Number of orders created",
  "revenue": "Total from PAID orders",
  "conversionLead": "leads / traffic",
  "conversionRevenue": "orders / traffic",
  "range": "Date range queried"
}
```

## 🔧 Test Data Generation

### Automated Load Test
```bash
# Script sẽ generate:
- 1 health check
- 1 lead với random email  
- 1 order
- 5-10 traffic events
- Dashboard validation
```

### Custom Test Data
```javascript
// Postman Pre-request Script examples:
const randomEmail = `test-${Date.now()}@example.com`;
pm.environment.set("random_email", randomEmail);

const sessionId = `sess_${pm.variables.replaceIn('{{$randomUUID}}')}`;
pm.environment.set("session_id", sessionId);
```

## 🎯 Success Criteria

### ✅ All Tests Pass When:
- [x] Health endpoint returns 200
- [x] 3 courses loaded từ DataInitializer
- [x] Lead creation thành công với unique email
- [x] Duplicate email returns 409 error
- [x] Validation errors return 400 với error details
- [x] Order creation marks status as PAID
- [x] Traffic events được tracked
- [x] Dashboard shows correct metrics
- [x] KPI calculations are accurate
- [x] Swagger docs accessible tại `/swagger-ui.html`

### 📊 Expected Numbers (after full test)
```json
{
  "traffic": 5-15,
  "leads": 1-3,  
  "orders": 1-2,
  "revenue": 299000-698000,
  "conversionLead": 0.1-0.6,
  "conversionRevenue": 0.1-0.4
}
```

## 🛠 Troubleshooting

### Common Issues:
1. **Connection refused**: Backend chưa chạy
2. **Database errors**: MariaDB chưa start
3. **404 endpoints**: Sai base URL
4. **Validation errors**: Check request body format

### Debug Commands:
```bash
# Check backend status
curl http://localhost:8080/health

# Check database connection
curl http://localhost:8080/api/v1/courses

# View logs
tail -f logs/spring.log
```
