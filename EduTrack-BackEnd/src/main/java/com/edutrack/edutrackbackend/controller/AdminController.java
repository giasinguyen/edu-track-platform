package com.edutrack.edutrackbackend.controller;

import com.edutrack.edutrackbackend.dto.response.ApiResponse;
import com.edutrack.edutrackbackend.dto.response.DashboardResponse;
import com.edutrack.edutrackbackend.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin dashboard APIs")
public class AdminController {
    
    private final DashboardService dashboardService;
    
    @GetMapping("/dashboard")
    @Operation(summary = "Get dashboard data", description = "Retrieves dashboard analytics data for the specified date range")
    public ApiResponse<DashboardResponse> getDashboard(
            @RequestParam(required = false) 
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) 
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        
        // Default to last 7 days if no dates provided
        if (from == null) {
            from = LocalDate.now().minusDays(7);
        }
        if (to == null) {
            to = LocalDate.now();
        }
        
        DashboardResponse dashboard = dashboardService.getDashboardData(from, to);
        return ApiResponse.success(dashboard);
    }
}
