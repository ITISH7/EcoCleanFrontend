package com.junk.management.controller;

import com.junk.management.dto.StatisticsDTO;
import com.junk.management.dto.StatisticsResponseDto;
import com.junk.management.service.StatisticsService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatisticsController {

  @Autowired
  private StatisticsService statisticsService;

  @GetMapping("/homepage-statistics")
  public List<StatisticsDTO> getRoleCounts() {
    return statisticsService.getRoleCount();
  }

  @GetMapping("/merchant-stats")
  public ResponseEntity<List<StatisticsDTO>> fetchPickupStats(@RequestParam String email) {
    List<StatisticsDTO> stats = statisticsService.fetchPickupStats(email);
    return ResponseEntity.ok(stats);
  }

  @GetMapping("/admin-stats/{email}")
  public ResponseEntity<StatisticsResponseDto> getUserStatistics(@PathVariable String email){
    StatisticsResponseDto statisticsResponseDto= statisticsService.getUserStatistics(email);
    return ResponseEntity.ok(statisticsResponseDto);
  }
}