package com.adi.stms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name="assignee_id")
    private User assignee;

    private String status;    // e.g., "TODO", "IN_PROGRESS", "DONE"

    private LocalDate dueDate;
}
