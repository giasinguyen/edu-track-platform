package com.edutrack.edutrackbackend.controller;

import com.edutrack.edutrackbackend.dto.request.TrackEventRequest;
import com.edutrack.edutrackbackend.dto.response.ApiResponse;
import com.edutrack.edutrackbackend.entity.TrafficEvent;
import com.edutrack.edutrackbackend.service.TrafficEventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/track")
@RequiredArgsConstructor
@Tag(name = "Analytics", description = "Traffic tracking APIs")
public class TrackingController {
    
    private final TrafficEventService trafficEventService;
    
    @PostMapping
    @Operation(summary = "Track traffic event", description = "Records a traffic event for analytics")
    public ResponseEntity<ApiResponse<TrafficEvent>> trackEvent(
            @Valid @RequestBody TrackEventRequest request, 
            HttpServletRequest httpRequest) {
        TrafficEvent event = trafficEventService.trackEvent(request, httpRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Event tracked successfully", event));
    }
}
