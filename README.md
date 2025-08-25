# 🎓 EduTrack – Fullstack Education Platform

## 📌 Context
Các ứng viên nhận được bài kiểm tra này đều đã vượt qua vòng sàng lọc ban đầu và được đánh giá là những ứng viên tiềm năng nhất.  
Với văn hóa **STARTUP**, công ty coi trọng việc đánh giá năng lực dựa trên **số liệu thực tế** thay vì chỉ lý thuyết.  
Mục tiêu là cùng nhau tạo ra những sản phẩm chất lượng, thiết thực và có giá trị thực tiễn cho người dùng.  

- **Sản phẩm**: thuộc quyền sở hữu của ứng viên, doanh thu cũng là của ứng viên.  
- **Hỗ trợ**: mỗi ứng viên sẽ được hỗ trợ 50k/ngày trong quá trình kiểm tra.  
- **Hình thức**: Remote/Online.  
- **Thời gian**: từ **25/08/2025** đến hết ngày **30/08/2025**.  
- **Yêu cầu**: báo cáo tiến độ/hiệu suất hàng ngày.  

> Lưu ý: Ứng viên nào thấy không phù hợp với định hướng công việc cũng như văn hóa công ty có thể từ chối tham gia.  

---

## 🎯 Bài kiểm tra
Ứng viên cần xây dựng một **website hoặc landing page xoay quanh lĩnh vực giáo dục** (ví dụ: công cụ học tập, khóa học online, chi tiết khóa học, trang bán khóa học…).  

Chúng tôi không đặt nặng công nghệ sử dụng (bản v1 có thể đơn giản để tối ưu thời gian), mà quan tâm nhiều hơn đến:  
- Cách thiết kế sản phẩm để thu hút người dùng.  
- Tư duy marketing/sale.  
- Khả năng biến ý tưởng thành sản phẩm **có thể đo lường (traffic, leads, doanh thu)**.  

👉 Lý do: chúng tôi đang tìm kiếm những ứng viên phù hợp với vai trò **Product Owner** trong tương lai, chứ không chỉ thuần kỹ thuật.  

---

## 🛠 Yêu cầu chi tiết
### Ý tưởng sản phẩm (tùy chọn)
- Landing page khóa học **Tiếng Anh / Toán / Tin học**.  
- Website mini cung cấp **tài liệu miễn phí** (có phần premium trả phí).  
- Công cụ học online nhỏ (**flashcard, quiz, TOEIC mini test…**).  

### Thống kê/Dashboard
- Số lượt truy cập (traffic).  
- Số leads (form đăng ký).  
- Số đơn hàng và doanh thu (giả lập hoặc tính toán từ DB).  
- Conversion rate:  
  - Leads / Traffic  
  - Doanh thu / Traffic  

### Marketing
- Có yếu tố **SEO** (meta, từ khóa).  
- Nội dung **CTA** rõ ràng, hấp dẫn.  
- Thông điệp hướng đến người học (tự sáng tạo).  

---

## 📤 Output bắt buộc
Ứng viên cần nộp:  
1. **Link demo** (deploy trên Vercel/Netlify/Heroku hoặc video demo).  
2. **Source code** (GitHub/GitLab).  
3. **Báo cáo ngắn (PDF/Markdown)** gồm:  
   - Ý tưởng sản phẩm/landing page.  
   - Số liệu thực tế (traffic, leads, doanh thu nếu có).  
   - Giải thích cách đo lường (**Google Analytics, counter tự code, DB log…**).  
   - Đề xuất cách tăng traffic & tăng doanh thu thực tế.  

---

## 🔧 Gợi ý công cụ
- Tích hợp **Google Analytics / Meta Pixel** để đo lường thật.  
- Triển khai **chiến dịch marketing thử** (share link → tạo traffic nhỏ).  
- Thiết kế **UX/UI sáng tạo, phù hợp người học**.  

---

## 🚀 Công nghệ gợi ý (tham khảo)
- **Frontend**: React / Next.js, TailwindCSS  
- **Backend**: Spring Boot / Node.js / NestJS  
- **Database**: MySQL / PostgreSQL / MongoDB  
- **Deploy**: Vercel (frontend), Render/Railway (backend)  
- **Analytics**: Google Analytics, Meta Pixel  

---

## 📊 Dashboard minh họa (mong muốn)
```json
{
  "traffic": 1234,
  "leads": 87,
  "orders": 12,
  "revenue": 3450000,
  "conversionLead": "7.05%",
  "conversionRevenue": "0.97%"
}
