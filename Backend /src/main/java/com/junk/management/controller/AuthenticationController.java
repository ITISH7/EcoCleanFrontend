package com.junk.management.controller;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.constant.AppConstants;
import com.junk.management.dto.ChangePasswordDto;
import com.junk.management.dto.LoginDto;
import com.junk.management.dto.LoginResponseDto;
import com.junk.management.service.ProfileService;
import com.junk.management.service.impl.UserDetailsServiceImpl;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class AuthenticationController {

  @Autowired
  private UserDetailsServiceImpl userDetailsServiceImpl;

  @Autowired
  private ProfileService profileService;

  @PostMapping("/login")
  public ResponseEntity<LoginResponseDto> loginByEmail(@Valid @RequestBody LoginDto loginDto) {
    LoginResponseDto loginResponseDto = userDetailsServiceImpl.loginByEmail(loginDto);
    return new ResponseEntity<>(loginResponseDto,HttpStatus.OK);
  }

  @PostMapping("/user-logout")
  public ResponseEntity<?> logoutUser() throws Exception {
    userDetailsServiceImpl.logoutUser();
    return ResponseEntity.ok(AppConstants.LOGOUT_MESSAGE);
  }

  @PutMapping("/reset-password")
  public ResponseEntity<?> resetPassword(@Valid @RequestBody ChangePasswordDto changePasswordDto,
      @AuthenticationPrincipal CustomUserDetails customUserDetails) throws Exception {
    profileService.resetPassword(changePasswordDto, customUserDetails);
    return ResponseEntity.ok(AppConstants.PASSWORD_CHANGED_MESSAGE);
  }
}
