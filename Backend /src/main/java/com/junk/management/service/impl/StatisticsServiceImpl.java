package com.junk.management.service.impl;

import com.junk.management.dto.StatisticsDTO;
import com.junk.management.dto.StatisticsResponseDto;
import com.junk.management.model.Status;
import com.junk.management.model.User;
import com.junk.management.repo.OrderRepo;
import com.junk.management.repo.UserRepo;
import com.junk.management.service.StatisticsService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class StatisticsServiceImpl implements StatisticsService {

  @Autowired
  private UserRepo userRepo;

  @Autowired
  private OrderRepo orderRepo;

  @Autowired
  private ProfileServiceImpl profileService;

  public List<StatisticsDTO> getRoleCount() {
    List<Object[]> results = userRepo.findAllByRoleAndIsActive();

    Map<String, Long> roleCounts = new HashMap<>();
    roleCounts.put("USER", 0L);
    roleCounts.put("MERCHANT", 0L);
    if (results != null) {
      for (Object[] result : results) {
        String role = (String) result[0];
        Long count = (Long) result[1];
        if ("USER".equals(role) || "MERCHANT".equals(role)) {
          roleCounts.put(role, count);
        }
      }
    }
    return roleCounts.entrySet().stream()
        .map(entry -> new StatisticsDTO(entry.getKey(), entry.getValue()))
        .collect(Collectors.toList());
  }

  @Secured("ROLE_ADMIN")
  @Override
  public List<StatisticsDTO> fetchPickupStats(String email) {
    User user = profileService.validateEmail(email);
    List<Object[]> stats = orderRepo.countOrdersByStatus(user.getUserId(), Status.ASSIGNED,
        Status.COMPLETED);

    Map<String, Long> pickupCounts = new HashMap<>();
    pickupCounts.put(Status.ASSIGNED.name(), 0L);
    pickupCounts.put(Status.COMPLETED.name(), 0L);

    if (stats != null) {
      for (Object[] result : stats) {
        Status status = (Status) result[0];
        Long count = ((Number) result[1]).longValue();
        pickupCounts.put(status.name(), count);
      }
    }

    return pickupCounts.entrySet().stream()
        .map(entry -> new StatisticsDTO(entry.getKey(), entry.getValue()))
        .collect(Collectors.toList());
  }

  @Secured("ROLE_ADMIN")
  public StatisticsResponseDto getUserStatistics(String email) {
    User user = profileService.validateEmail(email);

    List<Object[]> result = orderRepo.countOrdersByStatusForUser(user);

    Map<Status, Long> statusCountMap = result.stream()
        .collect(Collectors.toMap(
            row -> (Status) row[0],
            row -> (Long) row[1]
        ));

    long completedOrders = statusCountMap.getOrDefault(Status.COMPLETED, 0L);
    long pendingOrders = statusCountMap.getOrDefault(Status.PENDING, 0L);
    long cancelledOrders = statusCountMap.getOrDefault(Status.CANCELLED, 0L);
    long ongoingOrders = statusCountMap.getOrDefault(Status.ASSIGNED, 0L);

    return new StatisticsResponseDto(completedOrders, pendingOrders, cancelledOrders, ongoingOrders);
  }

}

