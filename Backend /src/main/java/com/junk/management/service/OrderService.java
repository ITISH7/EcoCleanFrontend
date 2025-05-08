package com.junk.management.service;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.dto.OrderDetailsDto;
import com.junk.management.dto.OrderDto;
import com.junk.management.dto.OrderHistoryResponseDto;
import java.util.Map;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {

  void placeOrder(OrderDto orderDto, CustomUserDetails userDetails);

  void deleteOrder(UUID orderId, CustomUserDetails userDetails);

  void cancelOrder(UUID orderId, CustomUserDetails userDetails);

  Page<OrderHistoryResponseDto> fetchOrderHistory(CustomUserDetails userDetails, Pageable pageable);

  OrderDetailsDto fetchOrderDetails(UUID orderId, CustomUserDetails userDetails);

  Page<OrderHistoryResponseDto> getFilteredOrders(CustomUserDetails userDetails, Pageable pageable,
      String startDate, String endDate, Double minPrice, Double maxPrice, String status);

  Page<OrderHistoryResponseDto> fetchOngoingPickup(CustomUserDetails userDetails, Pageable pageable);

  Map<String,Double> fetchTotalRewards(CustomUserDetails userDetails);

  void deleteAllOrders(String status,CustomUserDetails userDetails);

}

