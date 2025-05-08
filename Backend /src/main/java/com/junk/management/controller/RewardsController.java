package com.junk.management.controller;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.service.OrderService;
import com.junk.management.service.RewardsService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rewards")
public class RewardsController {

  @Autowired
  private OrderService orderService;

  @Autowired
  private RewardsService rewardsService;

  @GetMapping
  public ResponseEntity<Map<String, Double>> getTotalRewards(
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    return ResponseEntity.ok(rewardsService.fetchTotalRewards(userDetails));
  }


  @GetMapping("/user/{email}")
  public ResponseEntity<Map<String, Double>> fetchTotalRewards(@PathVariable String email) {
    return ResponseEntity.ok(rewardsService.fetchUserRewards(email));
  }

  @GetMapping("/all-users")
  public ResponseEntity<Map<String, Double>> fetchAllUsersRewards() {
    return ResponseEntity.ok(rewardsService.fetchAllUsersRewards());
  }

}
