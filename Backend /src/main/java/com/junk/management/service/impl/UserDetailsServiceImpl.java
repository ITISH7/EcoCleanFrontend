package com.junk.management.service.impl;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.Security.JwtUtil;
import com.junk.management.dto.LoginDto;
import com.junk.management.dto.LoginResponseDto;
import com.junk.management.exception.EntityNotFoundException;
import com.junk.management.exception.IncorrectCredentialsException;
import com.junk.management.exception.UnauthorizedAccessException;
import com.junk.management.model.Role;
import com.junk.management.model.User;
import com.junk.management.constant.AppConstants;
import com.junk.management.model.UserSession;
import com.junk.management.repo.UserRepo;
import com.junk.management.repo.UserSessionRepo;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Slf4j
@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  @Lazy
  private AuthenticationManager authenticationManager;

  @Autowired
  @Lazy
  private UserDetailsService userDetailsService;

  @Autowired
  private JwtUtil jwtUtil;

  @Lazy
  @Autowired
  private UserRepo userRepo;

  @Autowired
  private UserSessionRepo userSessionRepo;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Optional<User> userOptional = userRepo.findByEmail(email);

    if (userOptional.isEmpty()) {
      log.error(AppConstants.USER_NOT_FOUND_BY_EMAIL);
      throw new UsernameNotFoundException(
          String.format(AppConstants.USER_NOT_FOUND_BY_EMAIL, email));

    }
    User user = userOptional.get();
    return new CustomUserDetails(user.getEmail(), user.getPassword(), user.getRole());
  }

  private void authenticate(LoginDto loginDto) throws Exception {

    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
    } catch (BadCredentialsException e) {
      log.error(AppConstants.INCORRECT_EMAIL_PASSWORD, e);
      throw new BadCredentialsException(AppConstants.INCORRECT_EMAIL_PASSWORD);
    }
  }

  public LoginResponseDto loginByEmail(LoginDto loginDto) {

    try {
      authenticate(loginDto);
      UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getEmail());
      Optional<User> user = userRepo.findByEmail(loginDto.getEmail());
      if (!user.get().getIsActive()) {
        throw new UnauthorizedAccessException(AppConstants.ACCESS_DENIED_MESSAGE);
      }
      userSessionRepo.deleteByUserId(user.get().getUserId());
      Role role = user.get().getRole();
      String token = jwtUtil.generateToken(userDetails.getUsername(),role);
      UserSession userSession = new UserSession(user.get().getUserId(), token);
      userSessionRepo.save(userSession);
      return new LoginResponseDto(token,user.get().getRole().name());
    } catch (AuthenticationException e) {
      log.error("Authentication failed", e);
      throw new IncorrectCredentialsException(AppConstants.INCORRECT_EMAIL_PASSWORD);
    } catch (Exception e) {
      log.error(AppConstants.TOKEN_NOT_CREATED, e);
      throw new IncorrectCredentialsException(AppConstants.INCORRECT_EMAIL_PASSWORD);
    }
  }

  public void logoutUser() {
    UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
        .getPrincipal();
    String email = userDetails.getUsername();
    User user = userRepo.findByEmail(email).orElseThrow(() -> {
      log.error(AppConstants.USER_NOT_FOUND_BY_EMAIL);
      return new EntityNotFoundException(AppConstants.USER_NOT_FOUND_BY_EMAIL + email);
    });
    userSessionRepo.deleteByUserId(user.getUserId());
    log.info("User session deleted for user: {}", email);
  }
}
