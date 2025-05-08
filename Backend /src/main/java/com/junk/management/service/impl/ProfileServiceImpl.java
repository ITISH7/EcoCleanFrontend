package com.junk.management.service.impl;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.constant.AppConstants;
import com.junk.management.dto.ChangePasswordDto;
import com.junk.management.dto.UserAddressDTO;
import com.junk.management.dto.UserDetailsDto;
import com.junk.management.exception.DuplicatePhoneNumberException;
import com.junk.management.exception.EntityNotFoundException;
import com.junk.management.exception.UnauthorizedAccessException;
import com.junk.management.model.AddressType;
import com.junk.management.model.User;
import com.junk.management.repo.AddressRepo;
import com.junk.management.repo.UserRepo;
import com.junk.management.service.ProfileService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
public class ProfileServiceImpl implements ProfileService {

  @Autowired
  private UserRepo userRepo;

  @Autowired
  private AddressRepo addressRepo;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Override
  public UserDetailsDto getDetails(CustomUserDetails customUserDetails) {
    User user = validateEmail(customUserDetails.getUsername());
    List<UserAddressDTO> addressDtoList = addressRepo.findByUserAndAddressType(user, AddressType.PRIMARY).stream().map(
        address -> new UserAddressDTO(address.getAddressId(), address.getHouseNumber(),
            address.getLocality(), address.getStreet(), address.getCity(), address.getState(),
            address.getPinCode(), address.getCountry())).collect(Collectors.toList());
    return new UserDetailsDto(user.getFirstName(), user.getLastName(), user.getEmail(),
        addressDtoList, user.getPhoneNumber());
  }

  @Override
  public void updateUserDetails(UserDetailsDto userDetailsDto,
      CustomUserDetails customUserDetails) {
    User user = validateEmail(customUserDetails.getUsername());
    if (userDetailsDto.getEmail() != null && !user.getEmail().equals(userDetailsDto.getEmail())) {
      log.error(AppConstants.EMAIL_UPDATE_DENIED);
      throw new IllegalArgumentException(AppConstants.EMAIL_UPDATE_DENIED);
    }
    if (userDetailsDto.getAddress() != null && !userDetailsDto.getAddress().isEmpty()) {
      log.error(AppConstants.ADDRESS_UPDATE_DENIED);
      throw new IllegalArgumentException(AppConstants.ADDRESS_UPDATE_DENIED);
    }
    Optional<User> phoneNumberExists = userRepo.findByPhoneNumber(userDetailsDto.getPhoneNumber());
    if (!user.getPhoneNumber().equals(userDetailsDto.getPhoneNumber())
        && phoneNumberExists.isPresent()) {
      log.error(AppConstants.DUPLICATE_PHONE_NUMBER_ERROR_MESSAGE);
      throw new DuplicatePhoneNumberException(AppConstants.DUPLICATE_PHONE_NUMBER_ERROR_MESSAGE);
    }
    user.setFirstName(userDetailsDto.getFirstName());
    user.setLastName(userDetailsDto.getLastName());
    user.setPhoneNumber(userDetailsDto.getPhoneNumber());
    userRepo.save(user);
  }

  @Override
  public void resetPassword(ChangePasswordDto changePasswordDto,
      CustomUserDetails customUserDetails) {
    User user = validateEmail(customUserDetails.getUsername());
    verifyPassword(user, changePasswordDto.getOldPassword());
    user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));

    if(changePasswordDto.getOldPassword().equals(changePasswordDto.getNewPassword()))
    {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,AppConstants.PASSWORD_CHANGE_DENIED);
    }
    userRepo.save(user);
  }

  public User validateEmail(String email) {
    return userRepo.findByEmail(email).orElseThrow(() -> {
      log.error(AppConstants.USER_NOT_FOUND_BY_EMAIL);
      return new EntityNotFoundException(AppConstants.USER_NOT_FOUND_BY_EMAIL + email);
    });
  }

  private void verifyPassword(User user, String password) {
    boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
    if (!passwordMatches) {
      log.error(AppConstants.INCORRECT_PASSWORD + "{}", user.getEmail());
      throw new UnauthorizedAccessException(AppConstants.INCORRECT_PASSWORD);
    }
  }
}