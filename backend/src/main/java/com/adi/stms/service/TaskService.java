package com.adi.stms.service;

import com.adi.stms.entity.Task;
import com.adi.stms.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    public List<Task> getTasksByBoard(Long boardId)
        { return taskRepository.findByBoardId(boardId); }

    public List<Task> getTasksByUser(Long userId)
        { return taskRepository.findByAssigneeId(userId); }

    public Task getTaskById(Long id)
        { return taskRepository.findById(id).orElse(null); }

    public Task saveTask(Task task)
        { return taskRepository.save(task); }

    public void deleteTask(Long id)
        { taskRepository.deleteById(id); }
}
