package com.adi.stms.repository;

import com.adi.stms.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByBoardId(Long boardId);
    List<Task> findByAssigneeId(Long userId);
}
