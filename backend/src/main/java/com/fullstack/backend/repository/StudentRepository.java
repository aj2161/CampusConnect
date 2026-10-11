package com.fullstack.backend.repository;

import com.fullstack.backend.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // Find student by email
    Student findByEmail(String email);

}