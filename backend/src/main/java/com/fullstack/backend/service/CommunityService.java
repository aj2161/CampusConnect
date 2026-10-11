package com.fullstack.backend.service;

import com.fullstack.backend.entity.CommunityPost;
import com.fullstack.backend.entity.CommunityReply;
import com.fullstack.backend.entity.Student;
import com.fullstack.backend.repository.CommunityPostRepository;
import com.fullstack.backend.repository.CommunityReplyRepository;
import com.fullstack.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommunityService {
    @Autowired private CommunityPostRepository communityPostRepository;
    @Autowired private CommunityReplyRepository communityReplyRepository;
    @Autowired private StudentRepository studentRepository;

    public CommunityPost createPost(String content, Long studentId) {
        if (content == null || content.trim().isEmpty()) throw new IllegalArgumentException("Post content is required.");
        if (studentId == null) throw new IllegalArgumentException("Please sign in before posting.");
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new IllegalArgumentException("Signed-in student was not found. Please sign in again."));
        CommunityPost post = new CommunityPost();
        post.setContent(content.trim());
        post.setTitle("");
        // The author name/department are read from MySQL, never trusted from the browser.
        post.setAuthor(student.getName());
        post.setAuthorDepartment(student.getDepartment());
        return communityPostRepository.save(post);
    }
    public List<CommunityPost> getAllPosts() { return communityPostRepository.findAll(); }
    public CommunityPost getPost(Long id) { return communityPostRepository.findById(id).orElse(null); }
    public CommunityReply addReply(CommunityReply reply) { return communityReplyRepository.save(reply); }
    public List<CommunityReply> getReplies(Long postId) { return communityReplyRepository.findByPostId(postId); }
}
