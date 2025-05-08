package com.junk.management.service;

import com.junk.management.Security.CustomUserDetails;
import java.util.Map;

public interface RewardsService {
  Map<String,Double> fetchTotalRewards(CustomUserDetails userDetails);

  Map<String, Double> fetchUserRewards(String email);

  Map<String, Double> fetchAllUsersRewards();
}
