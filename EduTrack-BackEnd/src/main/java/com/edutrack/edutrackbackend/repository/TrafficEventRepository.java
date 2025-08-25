package com.edutrack.edutrackbackend.repository;

import com.edutrack.edutrackbackend.entity.TrafficEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface TrafficEventRepository extends JpaRepository<TrafficEvent, Long> {
    
    @Query("SELECT COUNT(t) FROM TrafficEvent t WHERE t.createdAt BETWEEN :startDate AND :endDate")
    Long countByCreatedAtBetween(@Param("startDate") LocalDateTime startDate, 
                                 @Param("endDate") LocalDateTime endDate);
}
