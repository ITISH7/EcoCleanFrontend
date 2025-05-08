package com.junk.management.service;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.dto.JunkItemResponse;
import com.junk.management.dto.OrderDto;
import com.junk.management.dto.OrderListResponseDto;
import com.junk.management.dto.StatisticsDTO;
import com.junk.management.dto.UserDetailsDto;
import com.junk.management.model.Status;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MerchantService {

  UserDetailsDto fetchUserDetails(UUID orderID);

  Page<OrderListResponseDto> fetchOrderList(CustomUserDetails customUserDetails, Pageable pageable);

  Page<OrderListResponseDto> getPickups(CustomUserDetails customUserDetails, Pageable pageable,
      Status status);

  void updateOrder(UUID orderId, OrderDto orderDto);

  void updateStatus(UUID orderId, Status status, CustomUserDetails customUserDetails);

  void applyPickup(UUID orderId, CustomUserDetails customUserDetails);

  List<JunkItemResponse> orderDetails(UUID orderID);

  Double fetchMerchantExpenses(CustomUserDetails customUserDetails);

  List<StatisticsDTO> fetchPickupStats(CustomUserDetails customUserDetails);

  Page<OrderListResponseDto> fetchAppliedPickups(CustomUserDetails customUserDetails,
      Pageable pageable);

  void rejectPickup(UUID orderId, CustomUserDetails customUserDetails);
}
