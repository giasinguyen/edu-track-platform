package com.edutrack.edutrackbackend.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TrackEventRequest {
    
    @Size(max = 100, message = "Session ID must be less than 100 characters")
    private String sessionId;
    
    @Size(max = 500, message = "Path must be less than 500 characters")
    private String path;
    
    @Size(max = 500, message = "Referrer must be less than 500 characters")
    private String referrer;
    
    @Size(max = 1000, message = "User Agent must be less than 1000 characters")
    private String userAgent;
}
