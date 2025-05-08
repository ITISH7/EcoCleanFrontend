package com.junk.management.controller;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.constant.AppConstants;
import com.junk.management.dto.JunkItemResponse;
import com.junk.management.dto.OrderDto;
import com.junk.management.dto.OrderListResponseDto;
import com.junk.management.dto.StatisticsDTO;
import com.junk.management.dto.UserDetailsDto;
import com.junk.management.model.Status;
import com.junk.management.service.MerchantService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MerchantController {

  @Autowired
  private MerchantService merchantService;

  @GetMapping("/user-detail")
  public ResponseEntity<UserDetailsDto> getUserDetails(@RequestParam UUID orderID) {
    UserDetailsDto userListDto = merchantService.fetchUserDetails(orderID);
    return ResponseEntity.ok(userListDto);
  }

  @GetMapping("/order-list")
  public ResponseEntity<Page<OrderListResponseDto>> fetchOrderList(
      @AuthenticationPrincipal CustomUserDetails customUserDetails, Pageable pageable) {
    Page<OrderListResponseDto> orderListResponseDto = merchantService.fetchOrderList(
        customUserDetails, pageable);
    return ResponseEntity.ok(orderListResponseDto);
  }

  @GetMapping("/pickups")
  public ResponseEntity<Page<OrderListResponseDto>> getPickups(
      @AuthenticationPrincipal CustomUserDetails customUserDetails, Pageable pageable,
      @RequestParam Status status) {
    Page<OrderListResponseDto> orderListResponseDto = merchantService.getPickups(customUserDetails,
        pageable, status);
    return ResponseEntity.ok(orderListResponseDto);
  }

  @PutMapping("/order")
  public ResponseEntity<String> updateOrder(@Valid @RequestBody OrderDto orderDto,
      @RequestParam UUID orderId) {
    merchantService.updateOrder(orderId, orderDto);
    return ResponseEntity.ok(AppConstants.ORDER_UPDATED);
  }

  @PutMapping("/status")
  public ResponseEntity<String> updateStatus(@RequestParam UUID orderId,
      @RequestParam Status status, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
    merchantService.updateStatus(orderId, status, customUserDetails);
    return ResponseEntity.ok(AppConstants.STATUS_CHANGED);
  }

  @PostMapping("/apply-pickup")
  public ResponseEntity<String> applyPickup(@RequestParam UUID orderId,
      @AuthenticationPrincipal CustomUserDetails customUserDetails) {
    merchantService.applyPickup(orderId, customUserDetails);
    return ResponseEntity.accepted().body(AppConstants.MERCHANT_APPLIED_FOR_PICKUP);
  }

  @GetMapping("/order-details")
  public ResponseEntity<List<JunkItemResponse>> orderDetails(@RequestParam UUID orderID) {
    List<JunkItemResponse> junkItemResponse = merchantService.orderDetails(orderID);
    return ResponseEntity.ok(junkItemResponse);
  }

  @GetMapping("/merchant-expenses")
  public ResponseEntity<Double> getMerchantExpenses(
      @AuthenticationPrincipal CustomUserDetails customUserDetails) {
    Double merchantExpenses = merchantService.fetchMerchantExpenses(customUserDetails);
    return ResponseEntity.ok(merchantExpenses);
  }

  @GetMapping("/pickup-statistics")
  public ResponseEntity<List<StatisticsDTO>> getPickupStats(
      @AuthenticationPrincipal CustomUserDetails customUserDetails) {
    List<StatisticsDTO> stats = merchantService.fetchPickupStats(customUserDetails);
    return ResponseEntity.ok(stats);
  }

  @GetMapping("/applied-pickups")
  public ResponseEntity<Page<OrderListResponseDto>> fetchAppliedPickups(
      @AuthenticationPrincipal CustomUserDetails customUserDetails, Pageable pageable) {
    Page<OrderListResponseDto> orderListResponseDto = merchantService.fetchAppliedPickups(
        customUserDetails, pageable);
    return ResponseEntity.ok(orderListResponseDto);
  }

  @PutMapping("/reject-pickup")
  public ResponseEntity<String> rejectPickup(@RequestParam UUID orderId,
      @AuthenticationPrincipal CustomUserDetails customUserDetails) {
    merchantService.rejectPickup(orderId, customUserDetails);
    return ResponseEntity.accepted().body(AppConstants.PICKUP_REJECTED);
  }
}