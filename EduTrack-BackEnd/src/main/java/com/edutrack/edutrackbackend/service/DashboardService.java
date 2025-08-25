package com.edutrack.edutrackbackend.service;

import com.edutrack.edutrackbackend.dto.response.DashboardResponse;
import com.edutrack.edutrackbackend.repository.LeadRepository;
import com.edutrack.edutrackbackend.repository.OrderRepository;
import com.edutrack.edutrackbackend.repository.TrafficEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class DashboardService {
    
    private final TrafficEventRepository trafficEventRepository;
    private final LeadRepository leadRepository;
    private final OrderRepository orderRepository;
    
    public DashboardResponse getDashboardData(LocalDate fromDate, LocalDate toDate) {
        log.info("Generating dashboard data from {} to {}", fromDate, toDate);
        
        LocalDateTime startDateTime = fromDate.atStartOfDay();
        LocalDateTime endDateTime = toDate.atTime(LocalTime.MAX);
        
        Long traffic = trafficEventRepository.countByCreatedAtBetween(startDateTime, endDateTime);
        Long leads = leadRepository.countByCreatedAtBetween(startDateTime, endDateTime);
        Long orders = orderRepository.countByCreatedAtBetween(startDateTime, endDateTime);
        BigDecimal revenue = orderRepository.sumRevenueByCreatedAtBetween(startDateTime, endDateTime);
        
        // Avoid division by zero
        Double conversionLead = traffic > 0 ? (double) leads / traffic : 0.0;
        Double conversionRevenue = traffic > 0 ? (double) orders / traffic : 0.0;
        
        String range = fromDate + ".." + toDate;
        
        return new DashboardResponse(
                traffic,
                leads,
                orders,
                revenue != null ? revenue : BigDecimal.ZERO,
                conversionLead,
                conversionRevenue,
                range
        );
    }
}
