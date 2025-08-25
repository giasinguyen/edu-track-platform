package com.edutrack.edutrackbackend.controller;

import com.edutrack.edutrackbackend.dto.response.ApiResponse;
import com.edutrack.edutrackbackend.entity.Course;
import com.edutrack.edutrackbackend.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
@Tag(name = "Courses", description = "Course management APIs")
public class CourseController {
    
    private final CourseService courseService;
    
    @GetMapping
    @Operation(summary = "Get all courses", description = "Retrieves a list of all available courses")
    public ApiResponse<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ApiResponse.success(courses);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get course by ID", description = "Retrieves a specific course by its ID")
    public ApiResponse<Course> getCourseById(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        return ApiResponse.success(course);
    }
}
