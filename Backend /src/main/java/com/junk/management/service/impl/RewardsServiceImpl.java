package com.junk.management.service.impl;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.model.Order;
import com.junk.management.model.Status;
import com.junk.management.model.User;
import com.junk.management.repo.OrderRepo;
import com.junk.management.service.RewardsService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

@Service
public class RewardsServiceImpl implements RewardsService {

  @Autowired
  private ProfileServiceImpl profileService;

  @Autowired
  private OrderRepo orderRepo;


  @Override
  public Map<String, Double> fetchTotalRewards(CustomUserDetails userDetails) {
    User user = profileService.validateEmail(userDetails.getUsername());
    List<Order> completedOrders = orderRepo.findByUserAndStatus(user, Status.COMPLETED);
    Double totalRewards = completedOrders.stream().mapToDouble(Order::getTotalRewards).sum();
    Map<String, Double> response = new HashMap<>();
    response.put("totalRewards", totalRewards);
    return response;
  }

  @Secured("ROLE_ADMIN")
  @Override
  public Map<String, Double> fetchUserRewards(String email) {
    User user = profileService.validateEmail(email);
    List<Order> totalCompletedOrders = orderRepo.findByUserAndStatus(user,Status.COMPLETED);
    Double totalCompletedRewards = totalCompletedOrders.stream().mapToDouble(Order::getTotalRewards).sum();
    Map<String,Double> response = new HashMap<>();
    response.put("totalRewards", totalCompletedRewards);
    return response;
  }

  @Secured("ROLE_ADMIN")
  @Override
  public Map<String, Double> fetchAllUsersRewards() {
    List<Order> allCompletedOrders = orderRepo.findOrdersByStatus(Status.COMPLETED);
    Double allCompletedRewards = allCompletedOrders.stream().mapToDouble(Order::getTotalRewards).sum();
    Map<String,Double> response = new HashMap<>();
    response.put("totalRewards",allCompletedRewards);
    return response;
  }
}
