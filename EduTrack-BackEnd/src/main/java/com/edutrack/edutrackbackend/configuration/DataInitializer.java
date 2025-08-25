package com.edutrack.edutrackbackend.configuration;

import com.edutrack.edutrackbackend.entity.Course;
import com.edutrack.edutrackbackend.entity.Lead;
import com.edutrack.edutrackbackend.entity.Order;
import com.edutrack.edutrackbackend.entity.TrafficEvent;
import com.edutrack.edutrackbackend.repository.CourseRepository;
import com.edutrack.edutrackbackend.repository.LeadRepository;
import com.edutrack.edutrackbackend.repository.OrderRepository;
import com.edutrack.edutrackbackend.repository.TrafficEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {
    
    private final CourseRepository courseRepository;
    private final LeadRepository leadRepository;
    private final OrderRepository orderRepository;
    private final TrafficEventRepository trafficEventRepository;
    
    private final Random random = new Random();
    
    @Bean
    public ApplicationRunner initializeData() {
        return args -> {
            initializeCourses();
            initializeLeads();
            initializeTrafficEvents();
            initializeOrders();
            log.info("Sample data initialization completed successfully");
        };
    }
    
    private void initializeCourses() {
        if (courseRepository.count() == 0) {
            log.info("Initializing default courses...");
            
            Course englishCourse = new Course();
            englishCourse.setTitle("Khóa học Tiếng Anh Giao tiếp Cơ bản");
            englishCourse.setSlug("tieng-anh-giao-tiep-co-ban");
            englishCourse.setPrice(new BigDecimal("299000"));
            englishCourse.setCategory("English");
            englishCourse.setDescription("Khóa học Tiếng Anh giao tiếp dành cho người mới bắt đầu. Học từ vựng cơ bản, ngữ pháp và kỹ năng giao tiếp hàng ngày.");
            
            Course mathCourse = new Course();
            mathCourse.setTitle("Toán học THPT - Luyện thi Đại học");
            mathCourse.setSlug("toan-hoc-thpt-luyen-thi-dai-hoc");
            mathCourse.setPrice(new BigDecimal("399000"));
            mathCourse.setCategory("Math");
            mathCourse.setDescription("Khóa học Toán THPT toàn diện, tập trung vào các dạng bài thi Đại học. Bao gồm Đại số, Hình học và Giải tích.");
            
            Course itCourse = new Course();
            itCourse.setTitle("Lập trình Web với React & Node.js");
            itCourse.setSlug("lap-trinh-web-react-nodejs");
            itCourse.setPrice(new BigDecimal("599000"));
            itCourse.setCategory("IT");
            itCourse.setDescription("Khóa học lập trình web fullstack từ cơ bản đến nâng cao. Học React, Node.js, Express, MongoDB và các công nghệ hiện đại.");
            
            courseRepository.saveAll(List.of(englishCourse, mathCourse, itCourse));
            log.info("Default courses initialized successfully");
        }
    }
    
    private void initializeLeads() {
        if (leadRepository.count() == 0) {
            log.info("Initializing sample leads...");
            
            List<Lead> sampleLeads = List.of(
                createLead("Nguyễn Văn An", "nguyenvanan@gmail.com", "+84901234567", "English"),
                createLead("Trần Thị Bình", "tranthibinh@yahoo.com", "+84902345678", "Math"), 
                createLead("Lê Minh Cường", "leminhcuong@outlook.com", "+84903456789", "IT"),
                createLead("Phạm Thị Dung", "phamthidung@gmail.com", "+84904567890", "English"),
                createLead("Hoàng Văn Em", "hoangvanem@hotmail.com", "+84905678901", "Math"),
                createLead("Vũ Thị Phương", "vuthiphuong@gmail.com", "+84906789012", "IT"),
                createLead("Đỗ Minh Giang", "dominhanh@gmail.com", "+84907890123", "English"),
                createLead("Ngô Thị Hoa", "ngothihoa@yahoo.com", "+84908901234", "Math"),
                createLead("Bùi Văn Khánh", "buivankhanh@outlook.com", "+84909012345", "IT"),
                createLead("Lý Thị Lan", "lythilan@gmail.com", "+84910123456", "English")
            );
            
            leadRepository.saveAll(sampleLeads);
            log.info("Sample leads initialized: {} records", sampleLeads.size());
        }
    }
    
    private Lead createLead(String name, String email, String phone, String interest) {
        Lead lead = new Lead();
        lead.setName(name);
        lead.setEmail(email);
        lead.setPhone(phone);
        lead.setInterest(interest);
        
        // Set random creation time in last 7 days
        LocalDateTime randomTime = LocalDateTime.now().minusDays(random.nextInt(7))
                .minusHours(random.nextInt(24))
                .minusMinutes(random.nextInt(60));
        lead.setCreatedAt(randomTime);
        
        return lead;
    }
    
    private void initializeTrafficEvents() {
        if (trafficEventRepository.count() == 0) {
            log.info("Initializing sample traffic events...");
            
            String[] paths = {"/", "/courses", "/courses/english", "/courses/math", "/courses/it", 
                            "/about", "/contact", "/pricing", "/blog", "/faq"};
            String[] referrers = {"https://google.com/search?q=khoa+hoc+tieng+anh", 
                                "https://facebook.com", "https://youtube.com", 
                                "https://google.com/search?q=hoc+toan+online",
                                "https://google.com/search?q=lap+trinh+web",
                                "direct", "https://zalo.me", "https://tiktok.com"};
            String[] userAgents = {
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1",
                "Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0"
            };
            
            // Generate 150 traffic events over last 7 days
            for (int i = 0; i < 150; i++) {
                TrafficEvent event = new TrafficEvent();
                event.setSessionId("sess_" + System.currentTimeMillis() + "_" + i);
                event.setPath(paths[random.nextInt(paths.length)]);
                event.setReferrer(referrers[random.nextInt(referrers.length)]);
                event.setUserAgent(userAgents[random.nextInt(userAgents.length)]);
                event.setIpAddress("192.168.1." + (random.nextInt(200) + 1));
                
                // Random time in last 7 days
                LocalDateTime randomTime = LocalDateTime.now().minusDays(random.nextInt(7))
                        .minusHours(random.nextInt(24))
                        .minusMinutes(random.nextInt(60));
                event.setCreatedAt(randomTime);
                
                trafficEventRepository.save(event);
            }
            
            log.info("Sample traffic events initialized: 150 records");
        }
    }
    
    private void initializeOrders() {
        if (orderRepository.count() == 0) {
            log.info("Initializing sample orders...");
            
            List<Course> courses = courseRepository.findAll();
            List<Lead> leads = leadRepository.findAll();
            
            if (!courses.isEmpty() && !leads.isEmpty()) {
                // Create 8 orders with different scenarios
                for (int i = 0; i < 8; i++) {
                    Order order = new Order();
                    
                    // Random course
                    Course randomCourse = courses.get(random.nextInt(courses.size()));
                    order.setCourse(randomCourse);
                    order.setAmount(randomCourse.getPrice());
                    
                    // 70% orders have associated leads
                    if (random.nextDouble() < 0.7) {
                        Lead randomLead = leads.get(random.nextInt(leads.size()));
                        order.setLead(randomLead);
                    }
                    
                    // 90% success rate
                    order.setStatus(random.nextDouble() < 0.9 ? Order.OrderStatus.PAID : Order.OrderStatus.FAILED);
                    
                    // Random time in last 7 days
                    LocalDateTime randomTime = LocalDateTime.now().minusDays(random.nextInt(7))
                            .minusHours(random.nextInt(24))
                            .minusMinutes(random.nextInt(60));
                    order.setCreatedAt(randomTime);
                    
                    orderRepository.save(order);
                }
                
                log.info("Sample orders initialized: 8 records");
            }
        }
    }
}
