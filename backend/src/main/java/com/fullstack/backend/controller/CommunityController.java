package com.fullstack.backend.controller;

import com.fullstack.backend.entity.CommunityPost;
import com.fullstack.backend.entity.CommunityReply;
import com.fullstack.backend.service.CommunityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    // =========================
    // CREATE POST
    // =========================

    @PostMapping("/posts")
    public CommunityPost createPost(@RequestBody Map<String, Object> request) {
        Object rawId = request.get("studentId");
        Long studentId = rawId == null ? null : Long.valueOf(rawId.toString());
        String content = request.get("content") == null ? null : request.get("content").toString();
        return communityService.createPost(content, studentId);
    }

    // =========================
    // GET ALL POSTS
    // =========================

    @GetMapping("/posts")
    public List<CommunityPost> getAllPosts() {
        return communityService.getAllPosts();
    }

    // =========================
    // GET SINGLE POST
    // =========================

    @GetMapping("/posts/{id}")
    public CommunityPost getPost(@PathVariable Long id) {
        return communityService.getPost(id);
    }

    // =========================
    // ADD REPLY
    // =========================

    @PostMapping("/posts/{postId}/replies")
    public CommunityReply addReply(
            @PathVariable Long postId,
            @RequestBody CommunityReply reply
    ) {

        reply.setPostId(postId);

        return communityService.addReply(reply);
    }

    // =========================
    // GET REPLIES
    // =========================

    @GetMapping("/posts/{postId}/replies")
    public List<CommunityReply> getReplies(
            @PathVariable Long postId
    ) {

        return communityService.getReplies(postId);
    }
}