package com.fullstack.backend.controller;

import com.fullstack.backend.entity.Student;
import com.fullstack.backend.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    }
)
public class StudentController {

    @Autowired
    private StudentService studentService;


    // =========================
    // REGISTER
    // =========================
    @PostMapping("/students")
    public Student addStudent(@RequestBody Student student) {

        return studentService.saveStudent(student);
    }


    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public Student login(@RequestBody Student student) {

        return studentService.loginStudent(
                student.getEmail(),
                student.getPassword()
        );
    }


    // =========================
    // GET ALL STUDENTS
    // =========================
    @GetMapping("/students")
    public List<Student> getAllStudents() {

        return studentService.getAllStudents();
    }


    // =========================
    // GET STUDENT BY ID
    // =========================
    @GetMapping("/students/{id}")
    public Student getStudent(
            @PathVariable Long id) {

        return studentService.getStudent(id);
    }


    // =========================
    // GET STUDENT BY EMAIL
    // =========================
    @GetMapping("/students/email/{email}")
    public Student getStudentByEmail(
            @PathVariable String email) {

        return studentService.getStudentByEmail(email);
    }



    // =========================
    // UPDATE STUDENT PROFILE
    // =========================
    @PutMapping("/students/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    // =========================
    // CHANGE PASSWORD (requires current password)
    // =========================
    @PostMapping("/change-password")
    public String changePassword(@RequestBody java.util.Map<String, String> request) {
        String email = request.get("email");
        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");
        boolean updated = studentService.changePassword(email, currentPassword, newPassword);
        if (updated) return "Password changed successfully";
        throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.BAD_REQUEST, "Current password is incorrect or student was not found");
    }

    // =========================
    // RESET PASSWORD
    // =========================
    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestBody Student student) {

        boolean updated =
                studentService.resetPassword(
                        student.getEmail(),
                        student.getPassword()
                );

        if (updated) {

            return "Password updated successfully";
        }

        return "Student not found";
    }
}