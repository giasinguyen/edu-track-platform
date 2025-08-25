package com.edutrack.edutrackbackend.repository;

import com.edutrack.edutrackbackend.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    
    boolean existsByEmail(String email);
    
    @Query("SELECT COUNT(l) FROM Lead l WHERE l.createdAt BETWEEN :startDate AND :endDate")
    Long countByCreatedAtBetween(@Param("startDate") LocalDateTime startDate, 
                                 @Param("endDate") LocalDateTime endDate);
}
