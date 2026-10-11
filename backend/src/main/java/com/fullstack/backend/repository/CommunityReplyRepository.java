package com.fullstack.backend.repository;

import com.fullstack.backend.entity.CommunityReply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityReplyRepository extends JpaRepository<CommunityReply, Long> {

    List<CommunityReply> findByPostId(Long postId);
}