package com.razeft.backend.rest;

import com.razeft.backend.enitity.Users;
import com.razeft.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public Users register(@RequestBody  Users user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public  String login(@RequestBody Users user) {
        return userService.verify(user);
    }
}
