package com.edutrack.edutrackbackend.repository;

import com.edutrack.edutrackbackend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    Optional<Course> findBySlug(String slug);
    
    boolean existsBySlug(String slug);
}
