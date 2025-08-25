package com.edutrack.edutrackbackend.service;

import com.edutrack.edutrackbackend.dto.request.CreateLeadRequest;
import com.edutrack.edutrackbackend.entity.Lead;
import com.edutrack.edutrackbackend.exception.ResourceAlreadyExistsException;
import com.edutrack.edutrackbackend.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LeadService {
    
    private final LeadRepository leadRepository;
    
    @Transactional
    public Lead createLead(CreateLeadRequest request) {
        log.info("Creating lead for email: {}", request.getEmail());
        
        if (leadRepository.existsByEmail(request.getEmail())) {
            throw new ResourceAlreadyExistsException("Email already exists: " + request.getEmail());
        }
        
        Lead lead = new Lead();
        lead.setName(request.getName());
        lead.setEmail(request.getEmail());
        lead.setPhone(request.getPhone());
        lead.setInterest(request.getInterest());
        
        Lead savedLead = leadRepository.save(lead);
        log.info("Lead created successfully with ID: {}", savedLead.getId());
        
        return savedLead;
    }
}
