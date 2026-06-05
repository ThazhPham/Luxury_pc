package poly.edu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import poly.edu.entity.User;
import poly.edu.service.AuthService;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public User login(@RequestBody User user){
        return authService.login(user.getEmail(), user.getPassword());
    }

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return authService.register(user);
    }

}