package com.fullstack.backend.service;

import com.fullstack.backend.entity.Student;
import com.fullstack.backend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;


    // =========================
    // REGISTER STUDENT
    // =========================
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }


    // =========================
    // LOGIN STUDENT
    // =========================
    public Student loginStudent(String email, String password) {

        Student student = studentRepository.findByEmail(email);

        if (student != null &&
            student.getPassword() != null &&
            student.getPassword().equals(password)) {

            return student;
        }

        return null;
    }


    // =========================
    // GET ALL STUDENTS
    // =========================
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }


    // =========================
    // GET STUDENT BY ID
    // =========================
    public Student getStudent(Long id) {

        Optional<Student> student =
                studentRepository.findById(id);

        return student.orElse(null);
    }


    // =========================
    // GET STUDENT BY EMAIL
    // =========================
    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }


    // =========================
    // UPDATE STUDENT PROFILE
    // =========================
    public Student updateStudent(
            Long id,
            Student updatedStudent) {

        Optional<Student> existingStudent =
                studentRepository.findById(id);

        if (existingStudent.isPresent()) {

            Student student =
                    existingStudent.get();

            // Update name
            student.setName(
                    updatedStudent.getName()
            );

            // Update email
            student.setEmail(
                    updatedStudent.getEmail()
            );

            // Update department
            student.setDepartment(
                    updatedStudent.getDepartment()
            );

            return studentRepository.save(student);
        }

        return null;
    }



    // =========================
    // CHANGE PASSWORD AFTER VERIFYING CURRENT PASSWORD
    // =========================
    public boolean changePassword(String email, String currentPassword, String newPassword) {
        if (email == null || currentPassword == null || newPassword == null || newPassword.length() < 6) {
            return false;
        }
        Student student = studentRepository.findByEmail(email);
        if (student == null || student.getPassword() == null || !student.getPassword().equals(currentPassword)) {
            return false;
        }
        student.setPassword(newPassword);
        studentRepository.save(student);
        return true;
    }

    // =========================
    // RESET PASSWORD
    // =========================
    public boolean resetPassword(
            String email,
            String newPassword) {

        Student student =
                studentRepository.findByEmail(email);

        if (student != null) {

            student.setPassword(newPassword);

            studentRepository.save(student);

            return true;
        }

        return false;
    }
}