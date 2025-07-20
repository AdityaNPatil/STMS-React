package com.adi.stms.controller;

import com.adi.stms.entity.Task;
import com.adi.stms.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {
    private final TaskService service;
    public TaskController(TaskService service) { this.service = service; }

    @GetMapping("/fetchTasks")
    public List<Task> getAllTasks() { return service.getAllTasks(); }

    @GetMapping("/board/{boardId}")
    public List<Task> getTasksByBoard(@PathVariable Long boardId) { return service.getTasksByBoard(boardId); }

    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUser(@PathVariable Long userId) { return service.getTasksByUser(userId); }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) { return service.getTaskById(id); }

    @PostMapping("/createTask")
    public Task createTask(@RequestBody Task task) { return service.saveTask(task); }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) { service.deleteTask(id); }
}
