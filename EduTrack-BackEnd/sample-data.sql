-- EduTrack Sample Data SQL Script
-- Run this if you want to manually insert sample data

-- Sample Courses (should already exist from DataInitializer)
INSERT IGNORE INTO courses (title, slug, price, category, description, created_at) VALUES
('Khóa học Tiếng Anh Giao tiếp Cơ bản', 'tieng-anh-giao-tiep-co-ban', 299000, 'English', 'Khóa học Tiếng Anh giao tiếp dành cho người mới bắt đầu. Học từ vựng cơ bản, ngữ pháp và kỹ năng giao tiếp hàng ngày.', NOW()),
('Toán học THPT - Luyện thi Đại học', 'toan-hoc-thpt-luyen-thi-dai-hoc', 399000, 'Math', 'Khóa học Toán THPT toàn diện, tập trung vào các dạng bài thi Đại học. Bao gồm Đại số, Hình học và Giải tích.', NOW()),
('Lập trình Web với React & Node.js', 'lap-trinh-web-react-nodejs', 599000, 'IT', 'Khóa học lập trình web fullstack từ cơ bản đến nâng cao. Học React, Node.js, Express, MongoDB và các công nghệ hiện đại.', NOW());

-- Sample Leads
INSERT IGNORE INTO leads (name, email, phone, interest, created_at) VALUES
('Nguyễn Văn An', 'nguyenvanan@gmail.com', '+84901234567', 'English', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)),
('Trần Thị Bình', 'tranthibinh@yahoo.com', '+84902345678', 'Math', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)),
('Lê Minh Cường', 'leminhcuong@outlook.com', '+84903456789', 'IT', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)),
('Phạm Thị Dung', 'phamthidung@gmail.com', '+84904567890', 'English', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)),
('Hoàng Văn Em', 'hoangvanem@hotmail.com', '+84905678901', 'Math', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)),
('Vũ Thị Phương', 'vuthiphuong@gmail.com', '+84906789012', 'IT', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)),
('Đỗ Minh Giang', 'dominhanh@gmail.com', '+84907890123', 'English', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)),
('Ngô Thị Hoa', 'ngothihoa@yahoo.com', '+84908901234', 'Math', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)),
('Bùi Văn Khánh', 'buivankhanh@outlook.com', '+84909012345', 'IT', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)),
('Lý Thị Lan', 'lythilan@gmail.com', '+84910123456', 'English', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY));

-- Sample Traffic Events (just a few examples, DataInitializer will create 150)
INSERT INTO traffic_events (session_id, path, referrer, user_agent, ip_address, created_at) VALUES
('sess_sample_1', '/', 'https://google.com/search?q=khoa+hoc+tieng+anh', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '192.168.1.100', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)),
('sess_sample_2', '/courses', 'https://facebook.com', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '192.168.1.101', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)),
('sess_sample_3', '/courses/english', 'direct', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15', '192.168.1.102', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)),
('sess_sample_4', '/courses/math', 'https://google.com/search?q=hoc+toan+online', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0', '192.168.1.103', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY));

-- Sample Orders
INSERT INTO orders (course_id, lead_id, amount, status, created_at) 
SELECT 
    c.id,
    l.id,
    c.price,
    CASE WHEN RAND() > 0.1 THEN 'PAID' ELSE 'FAILED' END,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY)
FROM courses c
CROSS JOIN leads l
WHERE RAND() < 0.3  -- Only create orders for ~30% of course-lead combinations
LIMIT 8;
