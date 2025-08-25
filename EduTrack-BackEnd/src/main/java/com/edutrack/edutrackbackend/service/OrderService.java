package com.edutrack.edutrackbackend.service;

import com.edutrack.edutrackbackend.dto.request.CreateOrderRequest;
import com.edutrack.edutrackbackend.entity.Course;
import com.edutrack.edutrackbackend.entity.Lead;
import com.edutrack.edutrackbackend.entity.Order;
import com.edutrack.edutrackbackend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final CourseService courseService;
    private final LeadService leadService;
    
    @Transactional
    public Order createOrder(CreateOrderRequest request) {
        log.info("Creating order for course ID: {}", request.getCourseId());
        
        Course course = courseService.getCourseById(request.getCourseId());
        
        Order order = new Order();
        order.setCourse(course);
        order.setAmount(request.getAmount());
        
        // If leadId is provided, associate the order with the lead
        if (request.getLeadId() != null) {
            // We'll implement this when we create the exception handling
            log.info("Associating order with lead ID: {}", request.getLeadId());
        }
        
        // Simulate payment processing - for MVP, we'll mark as PAID
        order.setStatus(Order.OrderStatus.PAID);
        
        Order savedOrder = orderRepository.save(order);
        log.info("Order created successfully with ID: {}", savedOrder.getId());
        
        return savedOrder;
    }
}
