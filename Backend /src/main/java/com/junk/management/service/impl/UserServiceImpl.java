package com.junk.management.service.impl;

import com.junk.management.constant.AppConstants;
import com.junk.management.dto.UserDTO;
import com.junk.management.exception.DuplicateEmailException;
import com.junk.management.exception.DuplicatePhoneNumberException;
import com.junk.management.model.Address;
import com.junk.management.model.AddressType;
import com.junk.management.model.Role;
import com.junk.management.model.User;
import com.junk.management.repo.UserRepo;
import com.junk.management.service.UserService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepo userRepo;

  @Autowired
  private BCryptPasswordEncoder encoder;

  public void saveUser(UserDTO userDTO) {
    Optional<User> emailExists = userRepo.findByEmail(userDTO.getEmail());
    Optional<User> phoneNumberExists = userRepo.findByPhoneNumber(userDTO.getPhoneNumber());
    if (emailExists.isPresent()) {
      log.error("Email entered by user is already assigned to someone");
      throw new DuplicateEmailException(AppConstants.DUPLICATE_EMAIL_ERROR_MESSAGE);
    }
    if (phoneNumberExists.isPresent()) {
      log.error("The user tried to use a number which is already registered");
      throw new DuplicatePhoneNumberException(AppConstants.DUPLICATE_PHONE_NUMBER_ERROR_MESSAGE);
    }
    if(userDTO.getRole().equalsIgnoreCase("Admin") || userDTO.getRole().equalsIgnoreCase("Super_Admin")){
      log.error(AppConstants.ADMIN_ROLE_DENIED);
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,AppConstants.ADMIN_ROLE_DENIED);
    }
    try {
      User user = new User();
      List<Address> addresses = userDTO.getAddress().stream().map(addressDTO -> {
        Address address = new Address();
        address.setHouseNumber(addressDTO.getHouseNumber());
        address.setLocality(addressDTO.getLocality());
        address.setStreet(addressDTO.getStreet());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setPinCode(addressDTO.getPinCode());
        address.setCountry(addressDTO.getCountry());
        address.setUser(user);
        address.setAddressType(AddressType.PRIMARY);
        return address;
      }).collect(Collectors.toList());

      user.setFirstName(userDTO.getFirstName());
      user.setLastName(userDTO.getLastName());
      user.setEmail(userDTO.getEmail());
      user.setPhoneNumber(userDTO.getPhoneNumber());
      user.setRole(Role.valueOf(userDTO.getRole().toUpperCase()));
      user.setAddresses(addresses);
      user.setPassword(encoder.encode(userDTO.getPassword()));
      user.setIsActive(true);
      log.info("A new {} has registered with email address :- {}", user.getRole(), user.getEmail());
      userRepo.save(user);
    } catch (IllegalArgumentException ex) {
      log.error("The role :- {} selected by user does not match USER or MERCHANT",
          userDTO.getRole());
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          AppConstants.INVALID_ROLE_MESSAGE + userDTO.getRole());
    }
  }
}
