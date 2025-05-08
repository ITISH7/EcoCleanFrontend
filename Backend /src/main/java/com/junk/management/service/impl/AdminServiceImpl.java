package com.junk.management.service.impl;

import com.junk.management.constant.AppConstants;
import com.junk.management.dto.JunkItemResponse;
import com.junk.management.dto.OrderDetailsResponseDto;
import com.junk.management.dto.OrderHistoryResponseDto;
import com.junk.management.dto.UserAddressDTO;
import com.junk.management.dto.UserDetailsDto;
import com.junk.management.dto.UserDetailsResponseDto;
import com.junk.management.dto.UserListDto;
import com.junk.management.exception.AddressNotFoundException;
import com.junk.management.exception.EntityNotFoundException;
import com.junk.management.exception.OrderNotFoundException;
import com.junk.management.model.Address;
import com.junk.management.model.Order;
import com.junk.management.model.OrderMerchantMapping;
import com.junk.management.model.Role;
import com.junk.management.model.Status;
import com.junk.management.model.User;
import com.junk.management.repo.AddressRepo;
import com.junk.management.repo.OrderMerchantMappingRepo;
import com.junk.management.repo.OrderRepo;
import com.junk.management.repo.UserRepo;
import com.junk.management.service.AdminService;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
@Secured("ROLE_ADMIN")
public class AdminServiceImpl implements AdminService {


  @Autowired
  private UserRepo userRepo;

  @Autowired
  private ProfileServiceImpl profileService;

  @Autowired
  private AddressRepo addressRepo;

  @Autowired
  private OrderRepo orderRepo;

  @Autowired
  private OrderMerchantMappingRepo orderMerchantMappingRepo;

  @Override
  public Page<UserListDto> fetchUserList(Pageable pageable) {
    Page<User> userPage = userRepo.findAll(pageable);
    if (userPage.isEmpty()) {
      log.error(AppConstants.INVALID_PAGE_NUMBER);
      throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
    }
    log.info("User list fetched successfully");
    return userPage.map(
        user -> new UserListDto(user.getEmail(), user.getFirstName(), user.getLastName(),
            user.getRole()));
  }

  @Override
  public UserDetailsDto getUserDetails(String email) {
    User user = profileService.validateEmail(email);
    List<UserAddressDTO> addressDtoList = addressRepo.findByUser(user).stream()
        .map(address -> new UserAddressDTO(
            address.getAddressId(),
            address.getHouseNumber(),
            address.getLocality(),
            address.getStreet(),
            address.getCity(),
            address.getState(),
            address.getPinCode(),
            address.getCountry()
        ))
        .collect(Collectors.toList());
    log.info("User details fetched successfully");
    return new UserDetailsDto(user.getFirstName(), user.getLastName(), user.getEmail(),
        addressDtoList, user.getPhoneNumber());
  }

  @Override
  public void removeUser(String email) {
    User user = profileService.validateEmail(email);
    if (!user.getIsActive()) {
      log.error(AppConstants.USER_NO_LONGER_EXISTS);
      throw new EntityNotFoundException(AppConstants.USER_NO_LONGER_EXISTS);
    }
    user.setIsActive(false);
    log.info(AppConstants.USER_REMOVAL_SUCCESSFUL);
    userRepo.save(user);
  }

  @Override
  public Page<UserListDto> filterUserByRole(Role role, Pageable pageable) {

    Page<User> userPage = userRepo.findAllByRole(role, pageable);
    if (userPage.isEmpty()) {
      log.error(AppConstants.INVALID_PAGE_NUMBER);
      throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
    }
    log.info("filtering user list on basis of role");
    return userPage.map(
        user -> new UserListDto(user.getEmail(), user.getFirstName(), user.getLastName(),
            user.getRole()));
  }

  @Override
  public Page<UserListDto> fetchByEmail(String email, Pageable pageable) {
    Page<User> userPage = userRepo.findByEmailContainingIgnoreCase(email, pageable);
    if (userPage.isEmpty()) {
      log.error(AppConstants.INVALID_PAGE_NUMBER);
      throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
    }
    return userPage.map(
        user -> new UserListDto(user.getEmail(), user.getFirstName(), user.getLastName(),
            user.getRole()));
  }

  @Override
  public Page<UserListDto> fetchDeletedUsers(Pageable pageable) {
    Page<User> userPage = userRepo.findAllByIsActive(false, pageable);
    if (userPage.isEmpty()) {
      log.error(AppConstants.INVALID_PAGE_NUMBER);
      throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
    }
    log.info("List of deleted user fetched");
    return userPage.map(
        user -> new UserListDto(user.getEmail(), user.getFirstName(), user.getLastName(),
            user.getRole()));
  }

  @Override
  public Page<OrderHistoryResponseDto> fetchOrderHistory(Pageable pageable) {
    Page<Order> orders = orderRepo.findAll(pageable);
    if (orders.isEmpty()) {
      log.error(AppConstants.INVALID_PAGE_NUMBER);
      throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
    }
    log.info("order history fetched");
    return orders.map(order -> new OrderHistoryResponseDto(order.getOrderId(), order.getStatus(),
        order.getOrderDate(), order.getTotalRewards()));
  }

  @Override
  public Page<OrderHistoryResponseDto> fetchFilteredOrders(Pageable pageable, String firstDate,
      String secondDate, Double minPrice, Double maxPrice, String status) {
    LocalDate dateStart =
        (firstDate != null && !firstDate.isEmpty()) ? LocalDate.parse(firstDate) : null;
    LocalDate dateEnd =
        (secondDate != null && !secondDate.isEmpty()) ? LocalDate.parse(secondDate) : null;
    Status statusStr =
        (status != null && !status.isEmpty()) ? Status.valueOf(status.toUpperCase()) : null;
    if (dateStart != null && dateEnd != null && dateStart.isAfter(dateEnd)) {
      throw new IllegalArgumentException(AppConstants.INVALID_DATE_RANGE);
    }
    if (dateEnd != null && dateEnd.isAfter(LocalDate.now())) {
      throw new IllegalArgumentException(AppConstants.INVALID_END_DATE);
    }
    if (minPrice != null && maxPrice != null && minPrice > maxPrice) {
      throw new IllegalArgumentException(AppConstants.INVALID_PRICE_RANGE);
    }
    Page<Order> orders = orderRepo.fetchOrdersByDateAndPriceRangeAndStatus(pageable, dateStart,
        dateEnd, minPrice, maxPrice, statusStr);
    if (orders.isEmpty()) {
      log.error(AppConstants.INVALID_PAGE_NUMBER);
      throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
    }
    return orders.map(order -> new OrderHistoryResponseDto(order.getOrderId(), order.getStatus(),
        order.getOrderDate(), order.getTotalRewards()));
  }

  @Override
  public void unblockUser(String email) {
    User user = profileService.validateEmail(email);
    if (user.getIsActive()) {
      log.error(AppConstants.USER_ALREADY_EXISTS);
      throw new EntityNotFoundException(AppConstants.USER_ALREADY_EXISTS);
    }
    user.setIsActive(true);
    log.info(AppConstants.USER_UNBLOCKED);
    userRepo.save(user);
  }

  @Override
  public OrderDetailsResponseDto fetchSpecificOrderDetails(UUID orderId) {
    Order order = orderRepo.findById(orderId)
        .orElseThrow(() -> new OrderNotFoundException(AppConstants.ORDER_NOT_FOUND));
    Status currentStatus = order.getStatus();
    List<JunkItemResponse> junkItemResponses = order.getJunkItems().stream().map(
        junkItem -> new JunkItemResponse(junkItem.getJunkType(), junkItem.getWeight(),
            junkItem.getUnitPrice(), junkItem.getEstimatedPrice())).collect(Collectors.toList());

    Address address = addressRepo.findById(order.getAddressId())
        .orElseThrow(() -> new AddressNotFoundException(AppConstants.ADDRESS_NOT_FOUND));

    UserAddressDTO addressDtoList = new UserAddressDTO(address.getAddressId(),
        address.getHouseNumber(), address.getLocality(), address.getStreet(), address.getCity(),
        address.getState(), address.getPinCode(), address.getCountry());

    OrderMerchantMapping mappings = orderMerchantMappingRepo.findByOrderId(orderId);

    User user = profileService.validateEmail(order.getUser().getEmail());
    UserDetailsResponseDto userDetailsResponseDto = new UserDetailsResponseDto(user.getFirstName(),
        user.getLastName(), user.getEmail(), user.getPhoneNumber());

    UserDetailsResponseDto merchantDetails = null;
    if (currentStatus == Status.ASSIGNED || currentStatus == Status.COMPLETED) {
      User merchant = userRepo.findById(mappings.getMerchantId()).orElseThrow(
          () -> new ResponseStatusException(HttpStatus.NOT_FOUND, AppConstants.MERCHANT_NOT_FOUND));

      merchantDetails = new UserDetailsResponseDto(merchant.getFirstName(), merchant.getLastName(),
          merchant.getEmail(), merchant.getPhoneNumber());
    }
    return new OrderDetailsResponseDto(order.getOrderId(), order.getStatus(), order.getOrderDate(),
        order.getTotalRewards(), addressDtoList, junkItemResponses, userDetailsResponseDto,
        merchantDetails);
  }
}

