package com.junk.management.service.impl;

import com.junk.management.constant.AppConstants;
import com.junk.management.dto.AdminListDto;
import com.junk.management.dto.AdminRegistrationDto;
import com.junk.management.exception.DuplicateEmailException;
import com.junk.management.exception.DuplicatePhoneNumberException;
import com.junk.management.exception.EntityNotFoundException;
import com.junk.management.model.Role;
import com.junk.management.model.User;
import com.junk.management.repo.UserRepo;
import com.junk.management.service.SuperAdminService;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Secured("ROLE_SUPER_ADMIN")
public class SuperAdminServiceImpl implements SuperAdminService {

  @Autowired
  private UserRepo userRepo;

  @Autowired
  private BCryptPasswordEncoder encoder;

  @Autowired
  private ProfileServiceImpl profileService;

  @Override
  public void registerAdmin(AdminRegistrationDto adminRegistrationDto) {

    Optional<User> emailExists = userRepo.findByEmail(adminRegistrationDto.getEmail());
    Optional<User> phoneNumberExists = userRepo.findByPhoneNumber(
        adminRegistrationDto.getPhoneNumber());
    if (emailExists.isPresent()) {
      log.error(AppConstants.DUPLICATE_EMAIL_ERROR_MESSAGE);
      throw new DuplicateEmailException(AppConstants.DUPLICATE_EMAIL_ERROR_MESSAGE);
    }
    if (phoneNumberExists.isPresent()) {
      log.error(AppConstants.DUPLICATE_PHONE_NUMBER_ERROR_MESSAGE);
      throw new DuplicatePhoneNumberException(AppConstants.DUPLICATE_PHONE_NUMBER_ERROR_MESSAGE);
    }
    User user = new User(
        adminRegistrationDto.getFirstName(),
        adminRegistrationDto.getLastName(),
        adminRegistrationDto.getEmail(),
        encoder.encode(adminRegistrationDto.getPassword()),
        adminRegistrationDto.getPhoneNumber(),
        true,
        Role.ADMIN
    );
  }

  @Override
  public Page<AdminListDto> fetchUserList(Pageable pageable) {
    Page<User> userPage = userRepo.findAllByRole(Role.ADMIN, pageable);
    if (userPage.isEmpty()) {
      if (pageable.getPageNumber() > 0) {
        log.error(AppConstants.INVALID_PAGE_NUMBER);
        throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
      }
      return Page.empty();
    }
    log.info("Admin list fetched successfully");
    return userPage.map(
        user -> new AdminListDto(user.getEmail(), user.getFirstName(), user.getLastName(),
            user.getPhoneNumber()));
  }

  @Override
  public void removeAdmin(String email) {
    User user = profileService.validateEmail(email);
    if (!user.getIsActive()) {
      log.error(AppConstants.USER_NO_LONGER_EXISTS);
      throw new EntityNotFoundException(AppConstants.USER_NO_LONGER_EXISTS);
    }
    userRepo.deleteById(user.getUserId());
    log.info(AppConstants.USER_REMOVAL_SUCCESSFUL);
  }
}




