package com.edutrack.edutrackbackend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateOrderRequest {
    
    @NotNull(message = "Course ID is required")
    @Positive(message = "Course ID must be positive")
    private Long courseId;
    
    private Long leadId; // Optional - for quick checkout without lead
    
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private BigDecimal amount;
    
    // Guest checkout fields (if leadId is not provided)
    private String guestName;
    private String guestEmail;
    private String guestPhone;
}
