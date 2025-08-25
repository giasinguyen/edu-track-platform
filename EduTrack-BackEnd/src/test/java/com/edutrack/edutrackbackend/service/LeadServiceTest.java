package com.edutrack.edutrackbackend.service;

import com.edutrack.edutrackbackend.dto.request.CreateLeadRequest;
import com.edutrack.edutrackbackend.entity.Lead;
import com.edutrack.edutrackbackend.exception.ResourceAlreadyExistsException;
import com.edutrack.edutrackbackend.repository.LeadRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LeadServiceTest {

    @Mock
    private LeadRepository leadRepository;

    @InjectMocks
    private LeadService leadService;

    private CreateLeadRequest validRequest;

    @BeforeEach
    void setUp() {
        validRequest = new CreateLeadRequest();
        validRequest.setName("John Doe");
        validRequest.setEmail("john@example.com");
        validRequest.setPhone("+84901234567");
        validRequest.setInterest("English");
    }

    @Test
    void createLead_Success() {
        // Given
        when(leadRepository.existsByEmail(anyString())).thenReturn(false);
        Lead savedLead = new Lead();
        savedLead.setId(1L);
        savedLead.setEmail(validRequest.getEmail());
        when(leadRepository.save(any(Lead.class))).thenReturn(savedLead);

        // When
        Lead result = leadService.createLead(validRequest);

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(validRequest.getEmail(), result.getEmail());
        verify(leadRepository).existsByEmail(validRequest.getEmail());
        verify(leadRepository).save(any(Lead.class));
    }

    @Test
    void createLead_EmailAlreadyExists_ThrowsException() {
        // Given
        when(leadRepository.existsByEmail(anyString())).thenReturn(true);

        // When & Then
        assertThrows(ResourceAlreadyExistsException.class, () -> {
            leadService.createLead(validRequest);
        });
        
        verify(leadRepository).existsByEmail(validRequest.getEmail());
        verify(leadRepository, never()).save(any(Lead.class));
    }
}
