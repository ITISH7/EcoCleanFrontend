package com.junk.management.service;

import com.junk.management.dto.OrderDetailsDto;
import com.junk.management.dto.OrderDetailsResponseDto;
import com.junk.management.dto.OrderHistoryResponseDto;
import com.junk.management.dto.StatisticsResponseDto;
import com.junk.management.dto.UserDetailsDto;
import com.junk.management.dto.UserListDto;
import com.junk.management.model.Role;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminService {

  Page<UserListDto> fetchUserList(Pageable pageable);

  UserDetailsDto getUserDetails(String email);

  void removeUser(String email);

  Page<UserListDto> filterUserByRole(Role role, Pageable pageable);

  Page<UserListDto> fetchByEmail(String email, Pageable pageable);

  Page<UserListDto> fetchDeletedUsers(Pageable pageable);

  Page<OrderHistoryResponseDto> fetchOrderHistory(Pageable pageable);

  Page<OrderHistoryResponseDto> fetchFilteredOrders(Pageable pageable, String firstDate,
      String secondDate, Double minPrice, Double maxPrice, String status);

  void unblockUser(String email);

  OrderDetailsResponseDto fetchSpecificOrderDetails(UUID orderId);
}
