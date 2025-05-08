package com.junk.management.controller;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.constant.AppConstants;
import com.junk.management.dto.ChangePasswordDto;
import com.junk.management.dto.UserDetailsDto;
import com.junk.management.service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/user")
public class ProfileController {

  @Autowired
  private ProfileService profileService;

  @GetMapping
  public ResponseEntity<?> getUserDetails(
      @AuthenticationPrincipal CustomUserDetails customUserDetails) {
    UserDetailsDto details = profileService.getDetails(customUserDetails);
    return ResponseEntity.ok(details);
  }

  @PutMapping
  public ResponseEntity<?> updateUserDetails(@Valid @RequestBody UserDetailsDto userDetailsDto,
      @AuthenticationPrincipal CustomUserDetails customUserDetails) throws Exception {
    profileService.updateUserDetails(userDetailsDto, customUserDetails);
    return ResponseEntity.ok(AppConstants.USER_DATA_UPDATE_MESSAGE);
  }

}