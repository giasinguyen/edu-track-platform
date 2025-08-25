package com.edutrack.edutrackbackend.controller;

import com.edutrack.edutrackbackend.dto.request.CreateLeadRequest;
import com.edutrack.edutrackbackend.dto.response.ApiResponse;
import com.edutrack.edutrackbackend.entity.Lead;
import com.edutrack.edutrackbackend.service.LeadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/leads")
@RequiredArgsConstructor
@Tag(name = "Leads", description = "Lead management APIs")
public class LeadController {
    
    private final LeadService leadService;
    
    @PostMapping
    @Operation(summary = "Create a new lead", description = "Creates a new lead with the provided information")
    public ResponseEntity<ApiResponse<Lead>> createLead(@Valid @RequestBody CreateLeadRequest request) {
        Lead lead = leadService.createLead(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Lead created successfully", lead));
    }
}
