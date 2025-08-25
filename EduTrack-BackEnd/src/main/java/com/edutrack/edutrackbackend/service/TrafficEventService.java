package com.edutrack.edutrackbackend.service;

import com.edutrack.edutrackbackend.dto.request.TrackEventRequest;
import com.edutrack.edutrackbackend.entity.TrafficEvent;
import com.edutrack.edutrackbackend.repository.TrafficEventRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrafficEventService {
    
    private final TrafficEventRepository trafficEventRepository;
    
    @Transactional
    public TrafficEvent trackEvent(TrackEventRequest request, HttpServletRequest httpRequest) {
        log.debug("Tracking event for path: {}", request.getPath());
        
        TrafficEvent event = new TrafficEvent();
        event.setSessionId(request.getSessionId());
        event.setPath(request.getPath());
        event.setReferrer(request.getReferrer());
        event.setUserAgent(request.getUserAgent());
        event.setIpAddress(getClientIpAddress(httpRequest));
        
        TrafficEvent savedEvent = trafficEventRepository.save(event);
        log.debug("Traffic event tracked with ID: {}", savedEvent.getId());
        
        return savedEvent;
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
}
