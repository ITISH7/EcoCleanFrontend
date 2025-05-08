package com.junk.management.service;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.dto.ChangePasswordDto;
import com.junk.management.dto.UserDetailsDto;

public interface ProfileService {

  UserDetailsDto getDetails(CustomUserDetails customUserDetails);

  void updateUserDetails(UserDetailsDto userDetailsDto, CustomUserDetails customUserDetails);

  void resetPassword(ChangePasswordDto changePasswordDto, CustomUserDetails customUserDetails);

}
