package com.junk.management.service;

import com.junk.management.dto.StatisticsDTO;
import com.junk.management.dto.StatisticsResponseDto;
import java.util.List;

public interface StatisticsService {

  List<StatisticsDTO> getRoleCount();

  List<StatisticsDTO> fetchPickupStats(String email);

  StatisticsResponseDto getUserStatistics(String email);
}
