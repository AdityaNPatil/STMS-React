package com.adi.stms.dto;

import com.adi.stms.entity.User;

public class AuthResponse {
    public String token;
    public User user;

    public AuthResponse(String token, User user){
        this.token = token;
        this.user = user;
    }
}
