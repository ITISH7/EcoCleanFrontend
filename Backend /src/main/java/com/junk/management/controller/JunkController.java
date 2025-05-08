package com.junk.management.controller;

import com.junk.management.constant.AppConstants;
import com.junk.management.dto.JunkDto;
import com.junk.management.dto.JunkResponseDto;
import com.junk.management.service.JunkService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/junk-details")
public class JunkController {

  @Autowired
  private JunkService junkService;

  @PostMapping
  public ResponseEntity<Void> enterJunkDetails(@Valid @RequestBody JunkDto junkDto) {
    junkService.enterJunkDetails(junkDto);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PutMapping
  public ResponseEntity<String> updateJunkDetails(@RequestBody JunkDto junkDto) {
    junkService.updateJunkDetails(junkDto);
    return ResponseEntity.ok(AppConstants.JUNK_DETAILS_UPDATED);
  }

  @DeleteMapping("/{junkType}")
  public ResponseEntity<String> deleteJunkDetails(@PathVariable String junkType) {
    junkService.removeJunkDetails(junkType);
    return ResponseEntity.ok(AppConstants.JUNK_DETAILS_REMOVED);
  }

  @GetMapping
  public ResponseEntity<Page<JunkResponseDto>> fetchJunkDetails(Pageable pageable) {
    Page<JunkResponseDto> junkDto = junkService.fetchJunkDetails(pageable);
    return ResponseEntity.ok(junkDto);
  }
}
