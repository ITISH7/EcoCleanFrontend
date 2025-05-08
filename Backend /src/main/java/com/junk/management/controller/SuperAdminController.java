package com.junk.management.controller;

import com.junk.management.constant.AppConstants;
import com.junk.management.dto.AdminListDto;
import com.junk.management.dto.AdminRegistrationDto;
import com.junk.management.service.SuperAdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class SuperAdminController {

  @Autowired
  private SuperAdminService superAdminService;

  @PostMapping()
  public ResponseEntity<String> registerAdmin(
      @RequestBody @Valid AdminRegistrationDto adminRegistrationDto) {
    superAdminService.registerAdmin(adminRegistrationDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(AppConstants.NEW_ADMIN_REGISTRATION);
  }

  @GetMapping()
  public ResponseEntity<Page<AdminListDto>> getUserList(Pageable pageable) {
    Page<AdminListDto> adminListDto = superAdminService.fetchUserList(pageable);
    return ResponseEntity.ok(adminListDto);
  }

  @DeleteMapping("/remove")
  public ResponseEntity<String> removeAdmin(@RequestParam String email) {
    superAdminService.removeAdmin(email);
    return ResponseEntity.ok(AppConstants.ADMIN_BLOCKED);
  }
}
