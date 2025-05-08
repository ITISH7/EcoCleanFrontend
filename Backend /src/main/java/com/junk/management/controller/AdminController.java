package com.junk.management.controller;

import com.junk.management.constant.AppConstants;
import com.junk.management.dto.OrderDetailsDto;
import com.junk.management.dto.OrderDetailsResponseDto;
import com.junk.management.dto.OrderHistoryResponseDto;
import com.junk.management.dto.StatisticsResponseDto;
import com.junk.management.dto.UserDetailsDto;
import com.junk.management.dto.UserListDto;
import com.junk.management.model.Role;
import com.junk.management.service.AdminService;
import com.junk.management.service.impl.StatisticsServiceImpl;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

  @Autowired
  private AdminService adminService;

  @GetMapping("/users")
  public ResponseEntity<Page<UserListDto>> getUserList(Pageable pageable) {
    Page<UserListDto> userListDto = adminService.fetchUserList(pageable);
    return ResponseEntity.ok(userListDto);
  }

  @GetMapping("/user-details/{email}")
  public ResponseEntity<UserDetailsDto> getUserDetails(@PathVariable String email) {
    UserDetailsDto userDetailsDto = adminService.getUserDetails(email);
    return ResponseEntity.ok(userDetailsDto);
  }

  @DeleteMapping("/user/{email}")
  public ResponseEntity<String> removeUser(@PathVariable String email) {
    adminService.removeUser(email);
    return ResponseEntity.ok(AppConstants.USER_REMOVAL_SUCCESSFUL);
  }

  @GetMapping("/users/{role}")
  public ResponseEntity<Page<UserListDto>> filterUserByRole(@PathVariable Role role,
      Pageable pageable) {
    Page<UserListDto> userListDto = adminService.filterUserByRole(role, pageable);
    return ResponseEntity.ok(userListDto);
  }

  @GetMapping("/user/{email}")
  public ResponseEntity<Page<UserListDto>> fetchByEmail(@PathVariable String email,
      Pageable pageable) {
    Page<UserListDto> userListDto = adminService.fetchByEmail(email, pageable);
    return ResponseEntity.ok(userListDto);
  }

  @GetMapping("/deleted-users")
  public ResponseEntity<Page<UserListDto>> fetchDeletedUsers(Pageable pageable) {
    Page<UserListDto> userListDto = adminService.fetchDeletedUsers(pageable);
    return ResponseEntity.ok(userListDto);
  }

  @GetMapping("/order-history")
  public ResponseEntity<Page<OrderHistoryResponseDto>> fetchOrderHistory(Pageable pageable) {
    Page<OrderHistoryResponseDto> orderHistoryResponseDto = adminService.fetchOrderHistory(
        pageable);
    return ResponseEntity.ok(orderHistoryResponseDto);
  }

  @GetMapping("/filter-orders")
  public ResponseEntity<Page<OrderHistoryResponseDto>> fetchFilteredOrders(Pageable pageable,
      @RequestParam(required = false) String firstDate,
      @RequestParam(required = false) String secondDate,
      @RequestParam(required = false) Double minPrice,
      @RequestParam(required = false) Double maxPrice,
      @RequestParam(required = false) String status) {
    Page<OrderHistoryResponseDto> orderHistoryResponseDto = adminService.fetchFilteredOrders(
        pageable, firstDate, secondDate, minPrice, maxPrice, status);
    return ResponseEntity.ok(orderHistoryResponseDto);
  }

  @PutMapping("/user/{email}")
  public ResponseEntity<String> unblockUser(@PathVariable String email) {
    adminService.unblockUser(email);
    return ResponseEntity.ok(AppConstants.USER_UNBLOCKED);
  }

  @GetMapping("/specific-order-details/{orderId}")
  public ResponseEntity<OrderDetailsResponseDto> fetchOrderDetails(@PathVariable UUID orderId) {
    OrderDetailsResponseDto orderDetailsResponseDto = adminService.fetchSpecificOrderDetails(
        orderId);
    return ResponseEntity.ok(orderDetailsResponseDto);
  }
}
