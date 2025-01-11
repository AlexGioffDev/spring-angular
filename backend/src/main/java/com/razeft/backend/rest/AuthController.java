package com.razeft.backend.rest;

import com.razeft.backend.enitity.Users;
import com.razeft.backend.service.JWTService;
import com.razeft.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;


    @PostMapping("/register")
    public Users register(@RequestBody  Users user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public  String login(@RequestBody Users user) {
        return userService.verify(user);
    }

    @GetMapping("/token-valid")
    public boolean validateToken(@RequestHeader("Authorization") String token) {
        if(token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        return jwtService.isStillValid(token);
    }



}
