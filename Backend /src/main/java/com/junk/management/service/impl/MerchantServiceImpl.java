package com.junk.management.service.impl;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.constant.AppConstants;
import com.junk.management.dto.JunkItemRequest;
import com.junk.management.dto.JunkItemResponse;
import com.junk.management.dto.OrderDto;
import com.junk.management.dto.OrderListResponseDto;
import com.junk.management.dto.StatisticsDTO;
import com.junk.management.dto.UserAddressDTO;
import com.junk.management.dto.UserDetailsDto;
import com.junk.management.exception.EntityNotFoundException;
import com.junk.management.model.Address;
import com.junk.management.model.OrderMerchantMapping;
import com.junk.management.model.Junk;
import com.junk.management.model.JunkItem;
import com.junk.management.model.Order;
import com.junk.management.model.Status;
import com.junk.management.model.User;
import com.junk.management.repo.AddressRepo;
import com.junk.management.repo.OrderMerchantMappingRepo;
import com.junk.management.repo.JunkItemRepo;
import com.junk.management.repo.JunkRepo;
import com.junk.management.repo.OrderRepo;
import com.junk.management.service.MerchantService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
public class MerchantServiceImpl implements MerchantService {

  @Autowired
  private OrderRepo orderRepo;

  @Autowired
  private AddressRepo addressRepo;

  @Autowired
  private JunkRepo junkRepo;

  @Autowired
  private JunkItemRepo junkItemRepo;

  @Autowired
  private ProfileServiceImpl profileService;

  @Autowired
  private OrderMerchantMappingRepo orderMerchantMappingRepo;

  @Override
  public UserDetailsDto fetchUserDetails(UUID orderID) {

    Order order = orderRepo.findById(orderID)
        .orElseThrow(() -> new EntityNotFoundException(AppConstants.ORDER_NOT_FOUND));

    User user = order.getUser();
    Long addressId = order.getAddressId();

    List<UserAddressDTO> address = addressRepo.findById(addressId).stream().map(
        a -> new UserAddressDTO(a.getAddressId(), a.getHouseNumber(), a.getLocality(),
            a.getStreet(),
            a.getCity(), a.getState(), a.getPinCode(), a.getCountry())).toList();

    return new UserDetailsDto(user.getFirstName(), user.getLastName(), user.getEmail(),
        address, user.getPhoneNumber());
  }

  @Override
  public Page<OrderListResponseDto> fetchOrderList(CustomUserDetails customUserDetails,
      Pageable pageable) {
    User user = profileService.validateEmail(customUserDetails.getUsername());
    Page<Order> orders = orderRepo.findUnmappedOrders(pageable, Status.PENDING, user.getUserId());
    if (orders.isEmpty()) {
      if (pageable.getPageNumber() > 0) {
        log.error(AppConstants.INVALID_PAGE_NUMBER);
        throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
      }
      return Page.empty();
    }

    return orders.map(order -> {
      Address address = addressRepo.findById(order.getAddressId())
          .orElseThrow(() -> new EntityNotFoundException(AppConstants.ADDRESS_NOT_FOUND));

      String fullAddress =
          address.getHouseNumber() + "," + address.getStreet() + "," + address.getLocality()
              + "," + address.getPinCode() + "," + address.getCity() + ","
              + address.getState() + "," + address.getCountry();
      return new OrderListResponseDto(order.getOrderId(),
          order.getOrderDate(), order.getTotalRewards(), fullAddress);
    });
  }

  @Override
  public Page<OrderListResponseDto> getPickups(CustomUserDetails customUserDetails,
      Pageable pageable, Status status) {

    User user = profileService.validateEmail(customUserDetails.getUsername());
    if (status.equals(Status.PENDING)) {
      log.error(AppConstants.PENDING_STATUS_NOT_ALLOWED);
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          AppConstants.PENDING_STATUS_NOT_ALLOWED);
    }
    Page<Order> orders = orderRepo.findByUserAndStatus(user, status, pageable);
    if (orders.isEmpty()) {
      if (pageable.getPageNumber() > 0) {
        log.error(AppConstants.INVALID_PAGE_NUMBER);
        throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
      }
      return Page.empty();
    }
    return orders.map(order -> {
      Address address = addressRepo.findById(order.getAddressId())
          .orElseThrow(() -> new EntityNotFoundException(AppConstants.ADDRESS_NOT_FOUND));

      String fullAddress =
          address.getHouseNumber() + " , " + address.getStreet() + " , " + address.getLocality()
              + " , " + address.getPinCode() + " , " + address.getCity() + " , "
              + address.getState() + " , " + address.getCountry();
      return new OrderListResponseDto(order.getOrderId(),
          order.getOrderDate(), order.getTotalRewards(), fullAddress);
    });
  }

  @Override
  @Transactional
  public void updateOrder(UUID orderId, OrderDto orderDto) {
    Order order = orderRepo.findById(orderId)
        .orElseThrow(() -> new EntityNotFoundException(AppConstants.ORDER_NOT_FOUND));

    User user = order.getUser();
    boolean isUserAddressValid = user.getAddresses().stream()
        .anyMatch(address -> address.getAddressId().equals(orderDto.getAddressId()));

    if (!isUserAddressValid) {
      throw new EntityNotFoundException(AppConstants.INVALID_ADDRESS);
    }
    if (!order.getMerchant().getUserId().equals(user.getUserId())) {
      log.error(AppConstants.UNAUTHORIZED_ACCESS);
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
          AppConstants.UNAUTHORIZED_ACCESS);
    }
    junkItemRepo.deleteByOrder_OrderId(orderId);

    List<JunkItem> junkItems = orderDto.getJunkItems().stream().map(itemRequest -> {
      String junkType = itemRequest.getJunkType().toUpperCase();
      Junk junk = junkRepo.findByJunkType(junkType)
          .orElseThrow(() -> new NoSuchElementException(AppConstants.JUNK_NOT_FOUND + junkType));

      double estimatedPrice = junk.getUnitPrice() * itemRequest.getWeight();

      return new JunkItem(order, junkType, itemRequest.getWeight(), junk.getUnitPrice(),
          estimatedPrice);
    }).collect(Collectors.toList());

    junkItemRepo.saveAll(junkItems);

    order.setJunkItems(junkItems);
    order.setTotalRewards(junkItems.stream().mapToDouble(JunkItem::getEstimatedPrice).sum());
    orderRepo.save(order);
  }

  @Override
  public void updateStatus(UUID orderId, Status status, CustomUserDetails customUserDetails) {
    User user = profileService.validateEmail(customUserDetails.getUsername());
    Order order = orderRepo.findById(orderId)
        .orElseThrow(() -> new EntityNotFoundException(AppConstants.ORDER_NOT_FOUND));
    if (order.getMerchant() == null) {
      log.error(AppConstants.MERCHANT_NOT_FOUND);
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, AppConstants.MERCHANT_NOT_FOUND);
    }
    if (!order.getMerchant().getUserId().equals(user.getUserId())) {
      log.error(AppConstants.UNAUTHORIZED_ACCESS);
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
          AppConstants.UNAUTHORIZED_ACCESS);
    }
    if (order.getStatus().equals(status)) {
      log.error(AppConstants.COMPLETED_ORDER_STATUS_CHANGE_DENIED);
    }
    if (status.equals(Status.VERIFIED) || status.equals(Status.COMPLETED)) {
      order.setStatus(status);
    } else if (status.equals(Status.PENDING)) {
      order.setStatus(status);
      order.setMerchant(null);
    } else {
      log.error(AppConstants.UNAUTHORIZED_STATUS_CHANGE);
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
          AppConstants.UNAUTHORIZED_STATUS_CHANGE);
    }
    orderRepo.save(order);
  }

  @Override
  public void applyPickup(UUID orderId, CustomUserDetails customUserDetails) {
    User user = profileService.validateEmail(customUserDetails.getUsername());
    boolean order = orderRepo.existsById(orderId);
    if (!order) {
      throw new EntityNotFoundException(AppConstants.ORDER_NOT_FOUND);
    }

    boolean alreadyApplied = orderMerchantMappingRepo.existsByMerchantIdAndOrderId(user.getUserId(),
        orderId);
    if (alreadyApplied) {
      log.error(AppConstants.ALREADY_APPLIED_FOR_PICKUP);
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          AppConstants.ALREADY_APPLIED_FOR_PICKUP);
    }
    OrderMerchantMapping merchant = new OrderMerchantMapping();
    merchant.setMerchantId(user.getUserId());
    merchant.setOrderId(orderId);
    merchant.setRejected(false);
    orderMerchantMappingRepo.save(merchant);
  }

  @Override
  public List<JunkItemResponse> orderDetails(UUID orderID) {
    Order order = orderRepo.findById(orderID)
        .orElseThrow(() -> new EntityNotFoundException(AppConstants.ORDER_NOT_FOUND));

    return order.getJunkItems().stream().map(
        junkItem -> new JunkItemResponse(junkItem.getJunkType(), junkItem.getWeight(),
            junkItem.getUnitPrice(), junkItem.getEstimatedPrice())).toList();
  }

  @Override
  public Double fetchMerchantExpenses(CustomUserDetails customUserDetails) {
    User merchant = profileService.validateEmail(customUserDetails.getUsername());
    if (!orderRepo.existsByMerchant_UserId(merchant.getUserId())) {
      return 0.0;
    }
    return orderRepo.findTotalRewardsByMerchantAndStatus(merchant, Status.COMPLETED);
  }

  @Override
  public List<StatisticsDTO> fetchPickupStats(CustomUserDetails customUserDetails) {
    User user = profileService.validateEmail(customUserDetails.getUsername());
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

  @Override
  public Page<OrderListResponseDto> fetchAppliedPickups(CustomUserDetails customUserDetails,
      Pageable pageable) {
    User user = profileService.validateEmail(customUserDetails.getUsername());

    Page<UUID> orderIds = orderMerchantMappingRepo.findOrderIdsByMerchantIdAndIsRejected(
        user.getUserId(), pageable, false);

    if (orderIds.isEmpty()) {
      if (pageable.getPageNumber() > 0) {
        log.error(AppConstants.INVALID_PAGE_NUMBER);
        throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
      }
      return Page.empty();
    }

    return orderIds.map(orderId -> {
      Order order = orderRepo.findById(orderId)
          .orElseThrow(() -> new EntityNotFoundException(AppConstants.ORDER_NOT_FOUND));

      Address address = addressRepo.findById(order.getAddressId())
          .orElseThrow(() -> new EntityNotFoundException(AppConstants.ADDRESS_NOT_FOUND));

      String fullAddress = String.join(",", address.getHouseNumber(), address.getStreet(),
          address.getLocality(), address.getPinCode(), address.getCity(),
          address.getState(), address.getCountry());

      return new OrderListResponseDto(order.getOrderId(),
          order.getOrderDate(), order.getTotalRewards(), fullAddress);
    });
  }

  @Override
  public void rejectPickup(UUID orderId, CustomUserDetails customUserDetails) {

    User user = profileService.validateEmail(customUserDetails.getUsername());
    boolean order = orderRepo.existsById(orderId);
    if (!order) {
      throw new EntityNotFoundException(AppConstants.ORDER_NOT_FOUND);
    }

    boolean alreadyApplied = orderMerchantMappingRepo.existsByMerchantIdAndOrderId(user.getUserId(),
        orderId);
    if (alreadyApplied) {
      log.error(AppConstants.ALREADY_APPLIED_FOR_PICKUP);
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          AppConstants.ALREADY_APPLIED_FOR_PICKUP);
    }
    OrderMerchantMapping merchant = new OrderMerchantMapping();
    merchant.setMerchantId(user.getUserId());
    merchant.setOrderId(orderId);
    merchant.setRejected(true);
    orderMerchantMappingRepo.save(merchant);
  }
}

