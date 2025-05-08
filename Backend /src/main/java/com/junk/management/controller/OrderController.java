package com.junk.management.controller;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.constant.AppConstants;
import com.junk.management.dto.OrderDetailsDto;
import com.junk.management.dto.OrderDto;
import com.junk.management.dto.OrderHistoryResponseDto;
import com.junk.management.service.OrderService;
import jakarta.validation.Valid;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @PostMapping
  public ResponseEntity<Void> placeOrder(@Valid @RequestBody OrderDto orderDto,
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    orderService.placeOrder(orderDto, userDetails);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{orderId}")
  public ResponseEntity<String> deleteOrder(@PathVariable UUID orderId,
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    orderService.deleteOrder(orderId, userDetails);
    return ResponseEntity.ok(AppConstants.ORDER_DELETED);
  }

  @PutMapping("/cancel-order/{orderId}")
  public ResponseEntity<String> cancelOrder(@PathVariable UUID orderId,
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    orderService.cancelOrder(orderId, userDetails);
    return ResponseEntity.ok(AppConstants.ORDER_CANCELLED);
  }

  @GetMapping
  public ResponseEntity<Page<OrderHistoryResponseDto>> getOrderHistory(
      @AuthenticationPrincipal CustomUserDetails userDetails, Pageable pageable) {

    Page<OrderHistoryResponseDto> orderHistory = orderService.fetchOrderHistory(userDetails,
        pageable);
    return ResponseEntity.ok(orderHistory);
  }

  @GetMapping("/{orderId}")
  public ResponseEntity<?> getOrderDetails(@PathVariable UUID orderId,
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    OrderDetailsDto orderDetailsDto = orderService.fetchOrderDetails(orderId, userDetails);
    return ResponseEntity.ok(orderDetailsDto);
  }

  @GetMapping("/filterOrders")
  public ResponseEntity<Page<OrderHistoryResponseDto>> getFilteredOrders(
      @AuthenticationPrincipal CustomUserDetails userDetails, Pageable pageable,
      @RequestParam(required = false) String startDate,
      @RequestParam(required = false) String endDate,
      @RequestParam(required = false) Double minPrice,
      @RequestParam(required = false) Double maxPrice,
      @RequestParam(required = false) String status) {
    Page<OrderHistoryResponseDto> orderHistoryResponseDto = orderService.getFilteredOrders(
        userDetails, pageable, startDate, endDate, minPrice, maxPrice, status);
    return ResponseEntity.ok(orderHistoryResponseDto);
  }

  @DeleteMapping("/status")
  public ResponseEntity<String> deleteAllOrders(@RequestParam(required = false) String status,@AuthenticationPrincipal CustomUserDetails userDetails){
    orderService.deleteAllOrders(status,userDetails);
    return ResponseEntity.ok(AppConstants.ORDER_DELETED);
  }

  @GetMapping("/ongoing-pickup")
  public ResponseEntity<Page<OrderHistoryResponseDto>> getOngoingPickup(@AuthenticationPrincipal CustomUserDetails userDetails, Pageable pageable){
    Page<OrderHistoryResponseDto> orderHistoryResponseDto = orderService.fetchOngoingPickup(userDetails,pageable);
    return ResponseEntity.ok(orderHistoryResponseDto);
  }
}

