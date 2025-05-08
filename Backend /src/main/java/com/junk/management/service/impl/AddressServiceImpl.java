package com.junk.management.service.impl;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.constant.AppConstants;
import com.junk.management.dto.UserAddressDTO;
import com.junk.management.exception.AddressNotFoundException;
import com.junk.management.exception.AlreadyExistsException;
import com.junk.management.exception.EntityNotFoundException;
import com.junk.management.model.Address;
import com.junk.management.model.AddressType;
import com.junk.management.model.User;
import com.junk.management.repo.AddressRepo;
import com.junk.management.repo.UserRepo;
import com.junk.management.service.AddressService;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
public class AddressServiceImpl implements AddressService {

  @Autowired
  private AddressRepo addressRepo;

  @Autowired
  private UserRepo userRepo;

  @Autowired
  ModelMapper modelMapper;

  @Override
  public void addNewAddress(UserAddressDTO userAddressDTO, CustomUserDetails customUserDetails) {
    User user = validateEmail(customUserDetails.getUsername());
    if ((userAddressDTO.getStreet() == null || userAddressDTO.getStreet().trim().isEmpty()) && (
        userAddressDTO.getLocality() == null || userAddressDTO.getLocality().trim().isEmpty())) {
      throw new IllegalArgumentException(AppConstants.ADDRESS_LOCALITY_MANDATORY);
    }
    Optional<Address> existingAddress = addressRepo.findByUserAndHouseNumberAndLocalityAndStreetAndCityAndStateAndPinCodeAndCountry(
        user, userAddressDTO.getHouseNumber(), userAddressDTO.getLocality(),
        userAddressDTO.getStreet(), userAddressDTO.getCity(), userAddressDTO.getState(),
        userAddressDTO.getPinCode(), userAddressDTO.getCountry());

    if (existingAddress.isPresent() && isSameAddress(existingAddress.get(), userAddressDTO)) {
      throw new AlreadyExistsException(AppConstants.ADDRESS_UPDATED_DENIED_MESSAGE);
    }
    Address address = new Address(user, userAddressDTO);
    address.setAddressType(AddressType.SECONDARY);
    addressRepo.save(address);
  }

  private boolean isSameAddress(Address existing, UserAddressDTO newAddress) {
    return equalsIgnoreCase(existing.getHouseNumber(), newAddress.getHouseNumber())
        && equalsIgnoreCase(existing.getLocality(), newAddress.getLocality()) && equalsIgnoreCase(
        existing.getStreet(), newAddress.getStreet()) && equalsIgnoreCase(existing.getCity(),
        newAddress.getCity()) && equalsIgnoreCase(existing.getState(), newAddress.getState())
        && equalsIgnoreCase(existing.getCountry(), newAddress.getCountry());
  }

  private boolean equalsIgnoreCase(String str1, String str2) {
    return Objects.equals(Optional.ofNullable(str1).orElse("").toLowerCase(),
        Optional.ofNullable(str2).orElse("").toLowerCase());
  }

  @Override
  public List<UserAddressDTO> getAddressList(CustomUserDetails customUserDetails) {
    User user = validateEmail(customUserDetails.getUsername());
    if (user.getAddresses() == null || user.getAddresses().isEmpty()) {
      throw new AddressNotFoundException(AppConstants.ADDRESS_NULL_MESSAGE);
    }
    List<UserAddressDTO> sortedAddresses = user.getAddresses().stream().sorted(Comparator.comparing(
        (Address address) -> address.getAddressType() == AddressType.PRIMARY ? 0 : 1)).map(
        address -> new UserAddressDTO(address.getAddressId(), address.getHouseNumber(),
            address.getLocality(), address.getStreet(), address.getCity(), address.getState(),
            address.getPinCode(), address.getCountry())).collect(Collectors.toList());

    return sortedAddresses;
  }

  @Override
  public void deleteAddress(Long addressId, CustomUserDetails customUserDetails) {
    User user = validateEmail(customUserDetails.getUsername());
    Address address = addressRepo.findById(addressId)
        .orElseThrow(() -> new AddressNotFoundException(AppConstants.ADDRESS_NULL_MESSAGE));
    if (!address.getUser().getUserId().equals(user.getUserId())) {
      log.error("user is not allowed to change address of another user");
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, AppConstants.UNAUTHORIZED_ACCESS);
    }
    if (address.getAddressType().equals(AddressType.PRIMARY)) {
      log.error(AppConstants.PERMANENT_ADDRESS_DELETION_DENIED);
      throw new ResponseStatusException(HttpStatus.FORBIDDEN,
          AppConstants.PERMANENT_ADDRESS_DELETION_DENIED);
    }
    addressRepo.delete(address);
  }

  @Override
  public void updateCurrentAddress(Long addressId, UserAddressDTO userAddressDTO,
      CustomUserDetails customUserDetails) {
    User user = validateEmail(customUserDetails.getUsername());
    Address address = addressRepo.findById(addressId)
        .orElseThrow(() -> new AddressNotFoundException(AppConstants.ADDRESS_NULL_MESSAGE));
    if ((userAddressDTO.getStreet() == null || userAddressDTO.getStreet().trim().isEmpty()) && (
        userAddressDTO.getLocality() == null || userAddressDTO.getLocality().trim().isEmpty())) {
      throw new IllegalArgumentException(AppConstants.ADDRESS_LOCALITY_MANDATORY);
    }
    if (!address.getUser().getUserId().equals(user.getUserId())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, AppConstants.UNAUTHORIZED_ACCESS);
    }
    Optional<Address> existingAddress = addressRepo.findByUserAndHouseNumberAndLocalityAndStreetAndCityAndStateAndPinCodeAndCountry(
        user, userAddressDTO.getHouseNumber(), userAddressDTO.getLocality(),
        userAddressDTO.getStreet(), userAddressDTO.getCity(), userAddressDTO.getState(),
        userAddressDTO.getPinCode(), userAddressDTO.getCountry());

    if (existingAddress.isPresent() && isSameAddress(existingAddress.get(), userAddressDTO)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          AppConstants.ADDRESS_UPDATED_DENIED_MESSAGE);
    }
    modelMapper.map(userAddressDTO, address);
    addressRepo.save(address);
  }

  @Override
  public void changePrimaryAddress(Long addressId, CustomUserDetails customUserDetails) {
    User user = validateEmail(customUserDetails.getUsername());
    Address address = addressRepo.findById(addressId)
        .orElseThrow(() -> new AddressNotFoundException(AppConstants.ADDRESS_NULL_MESSAGE));
    if (!address.getUser().getUserId().equals(user.getUserId())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, AppConstants.UNAUTHORIZED_ACCESS);
    }
    Address currentPrimary = addressRepo.findByUserAndAddressType(user, AddressType.PRIMARY)
        .orElseThrow(() -> new RuntimeException(AppConstants.ADDRESS_NOT_FOUND));
    if (address.getAddressType().equals(AddressType.PRIMARY)) {
      log.error(AppConstants.ADDRESS_ALREADY_PRIMARY);
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          AppConstants.ADDRESS_ALREADY_PRIMARY);
    }
    currentPrimary.setAddressType(AddressType.SECONDARY);
    address.setAddressType(AddressType.PRIMARY);
    addressRepo.save(address);
    addressRepo.save(currentPrimary);
  }

  private User validateEmail(String email) {
    return userRepo.findByEmail(email).orElseThrow(() -> {
      log.error(AppConstants.USER_NOT_FOUND_BY_EMAIL);
      return new EntityNotFoundException(AppConstants.USER_NOT_FOUND_BY_EMAIL + email);
    });
  }
}
