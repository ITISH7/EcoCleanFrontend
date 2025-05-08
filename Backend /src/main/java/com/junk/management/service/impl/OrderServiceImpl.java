package com.junk.management.service.impl;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.constant.AppConstants;
import com.junk.management.dto.JunkItemResponse;
import com.junk.management.dto.OrderDetailsDto;
import com.junk.management.dto.OrderDto;
import com.junk.management.dto.OrderHistoryResponseDto;
import com.junk.management.dto.UserAddressDTO;
import com.junk.management.exception.AddressNotFoundException;
import com.junk.management.exception.DeleteOrderException;
import com.junk.management.exception.EntityNotFoundException;
import com.junk.management.exception.InvalidDateException;
import com.junk.management.exception.OrderNotFoundException;
import com.junk.management.exception.UnauthorizedAccessException;
import com.junk.management.exception.UnauthorizedActionException;
import com.junk.management.model.Address;
import com.junk.management.model.JunkItem;
import com.junk.management.model.Junk;
import com.junk.management.model.Order;
import com.junk.management.model.Status;
import com.junk.management.model.User;
import com.junk.management.repo.AddressRepo;
import com.junk.management.repo.JunkItemRepo;
import com.junk.management.repo.JunkRepo;
import com.junk.management.repo.OrderRepo;
import com.junk.management.repo.UserRepo;
import com.junk.management.service.OrderService;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.HashSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

  @Autowired
  private OrderRepo orderRepo;

  @Autowired
  private UserRepo userRepo;

  @Autowired
  private JunkRepo junkRepo;

  @Autowired
  private JunkItemRepo junkItemRepo;

  @Autowired
  private AddressRepo addressRepo;

  @Autowired
  private ProfileServiceImpl profileService;

  @Secured("ROLE_USER")
  public void placeOrder(OrderDto orderDto, CustomUserDetails userDetails) {

    User user = profileService.validateEmail(userDetails.getUsername());
    boolean isUserAddressValid = user.getAddresses().stream()
        .anyMatch(address -> address.getAddressId().equals(orderDto.getAddressId()));

    if (!isUserAddressValid) {
      throw new EntityNotFoundException(AppConstants.INVALID_ADDRESS);
    }

    Order order = new Order(user, LocalDate.now(), Status.PENDING, orderDto.getAddressId(), false);

    List<JunkItem> junkItems = orderDto.getJunkItems().stream().map(itemRequest -> {
      Junk junk = junkRepo.findByJunkType(itemRequest.getJunkType().toUpperCase()).orElseThrow(
          () -> new NoSuchElementException(
              AppConstants.JUNK_NOT_FOUND + itemRequest.getJunkType()));

      double estimatedPrice = junk.getUnitPrice() * itemRequest.getWeight();

      return new JunkItem(order, itemRequest.getJunkType(), itemRequest.getWeight(),
          junk.getUnitPrice(), estimatedPrice);
    }).collect(Collectors.toList());

      order.setJunkItems(junkItems);
      order.setTotalRewards(junkItems.stream().mapToDouble(JunkItem::getEstimatedPrice).sum());
      orderRepo.save(order);
      junkItemRepo.saveAll(junkItems);
    }

  public void deleteOrder(UUID orderId, CustomUserDetails userDetails) {
    User user = profileService.validateEmail(userDetails.getUsername());
    Order order = validateOrder(orderId);
    Status currentStatus = order.getStatus();
    if (!order.getUser().getUserId().equals(user.getUserId())) {
      throw new UnauthorizedActionException(AppConstants.UNAUTHORIZED_ACTION);
    }
    if (currentStatus == Status.CANCELLED || currentStatus == Status.COMPLETED) {
      order.setIsDeleted(true);
      order.setStatus(Status.DELETED);
      orderRepo.save(order);
    } else {
      throw new DeleteOrderException(AppConstants.ORDER_CANNOT_BE_DELETED);
    }
  }

  public void cancelOrder(UUID orderId, CustomUserDetails userDetails) {
    User user = profileService.validateEmail(userDetails.getUsername());
    Order order = validateOrder(orderId);
    Status currentStatus = order.getStatus();
    if (!order.getUser().getUserId().equals(user.getUserId())) {
      throw new UnauthorizedActionException(AppConstants.UNAUTHORIZED_ACTION);
    }
    if (!(currentStatus == Status.PENDING || currentStatus == Status.ASSIGNED)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          AppConstants.ORDER_CANNOT_BE_CANCELLED);
    }
    order.setStatus(Status.CANCELLED);
    orderRepo.save(order);
  }

  public Page<OrderHistoryResponseDto> fetchOrderHistory(CustomUserDetails userDetails,
      Pageable pageable) {

    User user = profileService.validateEmail(userDetails.getUsername());
    Page<Order> orders = orderRepo.findByUserAndStatusNot(user, Status.DELETED, pageable);

    if (orders.isEmpty() && pageable.getPageNumber() > 0) {
      throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
    }
    return orders.map(order -> new OrderHistoryResponseDto(order.getOrderId(), order.getStatus(),
        order.getOrderDate(), order.getTotalRewards()));
  }

  @Override
  public OrderDetailsDto fetchOrderDetails(UUID orderId, CustomUserDetails userDetails) {
    User user = profileService.validateEmail(userDetails.getUsername());
    Order order = orderRepo.findById(orderId)
        .orElseThrow(() -> new OrderNotFoundException(AppConstants.ORDER_NOT_FOUND));
    if (!order.getUser().getUserId().equals(user.getUserId())) {
      throw new UnauthorizedAccessException(AppConstants.UNAUTHORIZED_ACCESS);
    }
    List<JunkItemResponse> junkItemResponses = order.getJunkItems().stream().map(
        junkItem -> new JunkItemResponse(junkItem.getJunkType(), junkItem.getWeight(),
            junkItem.getUnitPrice(), junkItem.getEstimatedPrice())).collect(Collectors.toList());

    Address address = addressRepo.findById(order.getAddressId())
        .orElseThrow(() -> new AddressNotFoundException(AppConstants.ADDRESS_NOT_FOUND));

    UserAddressDTO addressDtoList = new UserAddressDTO(address.getAddressId(),
        address.getHouseNumber(), address.getLocality(), address.getStreet(), address.getCity(),
        address.getState(), address.getPinCode(), address.getCountry());

    return new OrderDetailsDto(order.getOrderId(), order.getStatus(), order.getOrderDate(),
        order.getTotalRewards(), addressDtoList, junkItemResponses);
  }

  @Override
  public Page<OrderHistoryResponseDto> getFilteredOrders(CustomUserDetails userDetails,
      Pageable pageable, String startDate, String endDate, Double minPrice, Double maxPrice,
      String status) {
    User user = profileService.validateEmail(userDetails.getUsername());

    LocalDate dateStart =
        (startDate != null && !startDate.isEmpty()) ? LocalDate.parse(startDate) : null;
    LocalDate dateEnd = (endDate != null && !endDate.isEmpty()) ? LocalDate.parse(endDate) : null;
    Status statusStr =
        (status != null && !status.isEmpty()) ? Status.valueOf(status.toUpperCase()) : null;

    if (dateStart != null && dateEnd != null && dateStart.isAfter(dateEnd)) {
      throw new IllegalArgumentException(AppConstants.INVALID_DATE_RANGE);
    }
    if (dateEnd != null && dateEnd.isAfter(LocalDate.now())) {
      throw new InvalidDateException(AppConstants.INVALID_END_DATE);
    }
    if (minPrice != null && maxPrice != null && minPrice > maxPrice) {
      throw new IllegalArgumentException(AppConstants.INVALID_PRICE_RANGE);
    }
    if (statusStr == Status.DELETED) {
      throw new UnauthorizedAccessException(AppConstants.YOU_CANNOT_VIEW_DELETED_ORDERS);
    }

    Page<Order> orders = orderRepo.findOrdersByDateAndPriceRangeAndStatus(user, pageable, dateStart,
        dateEnd, minPrice, maxPrice, statusStr);

    if (orders.isEmpty() && pageable.getPageNumber() > 0) {
      log.error(AppConstants.INVALID_PAGE_NUMBER);
      throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
    }

    return orders.map(order -> new OrderHistoryResponseDto(order.getOrderId(), order.getStatus(),
        order.getOrderDate(), order.getTotalRewards()));
  }

  @Override
  public void deleteAllOrders(String status, CustomUserDetails userDetails) {
    User user = profileService.validateEmail(userDetails.getUsername());

    Set<Status> statusesToDelete = new HashSet<>();

    if (status == null || status.isEmpty()) {
      statusesToDelete.add(Status.COMPLETED);
      statusesToDelete.add(Status.CANCELLED);
    } else {
      try {
        Status statusStr = Status.valueOf(status.toUpperCase());
        if (statusStr == Status.CANCELLED || statusStr == Status.COMPLETED) {
          statusesToDelete.add(statusStr);
        } else {
          throw new DeleteOrderException(AppConstants.ORDER_CANNOT_BE_DELETED);
        }
      } catch (IllegalArgumentException e) {
        throw new DeleteOrderException("Invalid status provided: " + status);
      }
    }
    List<Order> orders = orderRepo.findOrdersByUserAndStatusIn(user, statusesToDelete);

    if (orders.isEmpty()) {
      throw new DeleteOrderException(AppConstants.NO_ORDER_FOUND);
    }
    orders.forEach(order -> {
      if (Boolean.TRUE.equals(order.getIsDeleted())) {
        throw new DeleteOrderException(AppConstants.ORDER_IS_ALREADY_DELETED);
      }
      order.setIsDeleted(true);
      order.setStatus(Status.DELETED);
    });
    orderRepo.saveAll(orders);
  }

  @Override
  public Page<OrderHistoryResponseDto> fetchOngoingPickup(CustomUserDetails userDetails,
      Pageable pageable) {
    User user = profileService.validateEmail(userDetails.getUsername());
    Page<Order> orders = orderRepo.findByUserAndStatus(user, Status.ASSIGNED, pageable);
    if (orders.isEmpty() && pageable.getPageNumber() > 0) {
      throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
    }
    return orders.map(order -> new OrderHistoryResponseDto(order.getOrderId(), order.getStatus(),
        order.getOrderDate(), order.getTotalRewards()));

  }

  @Override
  public Map<String, Double> fetchTotalRewards(CustomUserDetails userDetails) {
    User user = profileService.validateEmail(userDetails.getUsername());
    List<Order> completedOrders = orderRepo.findByUserAndStatus(user, Status.COMPLETED);
    Double totalRewards = completedOrders.stream().mapToDouble(Order::getTotalRewards).sum();
    Map<String, Double> response = new HashMap<>();
    response.put("totalRewards", totalRewards);
    return response;
  }

  private Order validateOrder(UUID orderId) {
    return orderRepo.findById(orderId)
        .orElseThrow(() -> new OrderNotFoundException(AppConstants.ORDER_NOT_FOUND));
  }

}


