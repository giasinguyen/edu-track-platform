package com.edutrack.edutrackbackend.service;

import com.edutrack.edutrackbackend.entity.Course;
import com.edutrack.edutrackbackend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseService {
    
    private final CourseRepository courseRepository;
    
    public List<Course> getAllCourses() {
        log.info("Fetching all courses");
        return courseRepository.findAll();
    }
    
    public Course getCourseById(Long id) {
        log.info("Fetching course by ID: {}", id);
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + id));
    }
}
