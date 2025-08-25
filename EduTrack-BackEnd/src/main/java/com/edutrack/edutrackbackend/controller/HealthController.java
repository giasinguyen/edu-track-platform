package com.edutrack.edutrackbackend.controller;

import com.edutrack.edutrackbackend.dto.response.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {
    
    @GetMapping("/health")
    public ApiResponse<Map<String, String>> health() {
        return ApiResponse.success("Service is healthy", Map.of(
                "status", "UP",
                "timestamp", String.valueOf(System.currentTimeMillis())
        ));
    }
}
