package com.razeft.backend.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String hello() {
        return "Hello world";
    }

    @GetMapping("/private")
    public String secretURL() {
        return "Only authenticated";
    }
}
