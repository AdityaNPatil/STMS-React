package com.adi.stms.controller;

import com.adi.stms.entity.Board;
import com.adi.stms.service.BoardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@CrossOrigin
public class BoardController {
    private final BoardService service;
    public BoardController(BoardService service) { this.service = service; }

    @GetMapping("/fetchBoards")
    public List<Board> getAllBoards() { return service.getAllBoards(); }

    @GetMapping("/{id}")
    public Board getBoardById(@PathVariable Long id) { return service.getBoard(id); }

    @PostMapping("/createBoard")
    public Board createBoard(@RequestBody Board board) { return service.saveBoard(board); }

    @DeleteMapping("/{id}")
    public void deleteBoard(@PathVariable Long id) { service.deleteBoard(id); }
}
