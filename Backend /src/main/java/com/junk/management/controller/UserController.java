package com.junk.management.controller;

import com.junk.management.dto.UserDTO;
import com.junk.management.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @Autowired
  private UserService service;

  @PostMapping("/user")
  public ResponseEntity<String> registerUser(@Valid @RequestBody UserDTO userDTO) {
    service.saveUser(userDTO);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }
}
