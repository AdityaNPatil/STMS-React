package com.adi.stms.controller;

import com.adi.stms.dto.AuthResponse;
import com.adi.stms.dto.UserDTO;
import com.adi.stms.entity.User;
import com.adi.stms.security.JwtUtil;
import com.adi.stms.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins="http://localhost:5173")
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;
    public UserController(UserService userService, JwtUtil jwtUtil){
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email){
        return userService.getByEmail(email);
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody UserDTO dto){
        User existing = userService.getByEmail(dto.email);
        if(existing != null){
            throw new RuntimeException("User Already Exists!");
        }
        User user = new User();
        user.setEmail(dto.email);
        user.setName(dto.name);
        user.setPassword(dto.password);
        User saved = userService.saveUser(user);

        String token = jwtUtil.generateToken(saved.getEmail());
        return new AuthResponse(token, saved);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody UserDTO dto){
        User user = userService.getByEmail(dto.email);
        if(user == null || !userService.checkPassword(dto.password, user.getPassword())){
            throw new RuntimeException("Invalid Credentials!!");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user);
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }
}
