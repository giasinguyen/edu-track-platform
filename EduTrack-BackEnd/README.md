# EduTrack Backend

## 📋 Tổng quan
Backend API cho hệ thống EduTrack - một nền tảng giáo dục MVP với các tính năng:
- Quản lý khóa học
- Thu thập leads 
- Xử lý đơn hàng (giả lập)
- Theo dõi traffic
- Dashboard admin với KPI

## 🛠 Tech Stack
- **Framework**: Spring Boot 3.5.5
- **Java**: 21
- **Database**: MariaDB (compatible with MySQL)
- **Security**: Spring Security
- **Documentation**: Swagger/OpenAPI
- **Build Tool**: Maven

## 🚀 Chạy ứng dụng

### Prerequisites
- Java 21
- MariaDB (hoặc MySQL) với port 3307

### 1. Thiết lập Database
```bash
# Tạo database MariaDB
CREATE DATABASE edutrack;

# MariaDB chạy trên port 3307 (default)
# Hoặc sử dụng MySQL trên port 3307
```

### 2. Cấu hình Environment
```bash
# Copy file env mẫu
cp .env.example .env

# Chỉnh sửa .env với thông tin database của bạn
```

### 3. Chạy ứng dụng
```bash
# Build và chạy
./mvnw spring-boot:run

# Hoặc build jar và chạy
./mvnw clean package
java -jar target/EduTrack-BackEnd-0.0.1-SNAPSHOT.jar
```

## 📡 API Endpoints

### Public APIs
- `GET /health` - Health check
- `GET /api/v1/courses` - Danh sách khóa học
- `POST /api/v1/leads` - Tạo lead mới
- `POST /api/v1/orders` - Tạo đơn hàng
- `POST /api/v1/track` - Theo dõi traffic

### Admin APIs
- `GET /api/v1/admin/dashboard` - Dashboard analytics

### API Documentation
- Swagger UI: http://localhost:8080/swagger-ui.html
- API Docs: http://localhost:8080/api-docs

## 📊 Response Format
```json
{
  "code": 0,
  "message": "OK", 
  "data": { ... }
}
```

### Error Response
```json
{
  "code": 1001,
  "message": "Validation error",
  "data": {
    "email": "Email should be valid"
  }
}
```

## 🔧 Configuration

### Environment Variables
```bash
DB_URL=jdbc:mariadb://localhost:3307/edutrack
DB_USER=root
DB_PASS=your_password
JWT_SECRET=your_secret_key
CORS_ORIGINS=http://localhost:3000
```

### Database Schema
Application sẽ tự động tạo các bảng:
- `leads` - Thông tin leads
- `courses` - Danh sách khóa học 
- `orders` - Đơn hàng
- `traffic_events` - Sự kiện traffic

## 🧪 Testing

### Postman Collection
```bash
# Import files into Postman:
# - EduTrack-API-Tests.postman_collection.json
# - EduTrack-Local.postman_environment.json

# Or run with Newman CLI:
npm install -g newman
newman run EduTrack-API-Tests.postman_collection.json -e EduTrack-Local.postman_environment.json
```

### Quick Test Scripts
```bash
# Quick API test with cURL
./quick-test.bat

# Full automated test suite
./run-tests.bat
```

### Manual Testing
```bash
# Health check
curl http://localhost:8080/health

# Create lead
curl -X POST http://localhost:8080/api/v1/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@test.com","phone":"0901234567","interest":"English"}'

# Dashboard
curl http://localhost:8080/api/v1/admin/dashboard
```

## 📈 KPI Metrics
- **Traffic**: Số lượt truy cập từ tracking events
- **Leads**: Số leads đăng ký
- **Orders**: Số đơn hàng được tạo
- **Revenue**: Tổng doanh thu từ đơn hàng PAID
- **Conversion Lead**: leads / traffic
- **Conversion Revenue**: orders / traffic

## 🔒 Security
- CORS được cấu hình cho frontend domains
- Input validation với Bean Validation
- Error handling toàn cục
- SQL injection protection với JPA

## 📝 Notes
- Default courses được tạo tự động lúc khởi động
- Orders được đánh dấu PAID ngay (để demo)
- Admin endpoints không có authentication (MVP)
- Traffic tracking lưu IP, User-Agent để phân tích
