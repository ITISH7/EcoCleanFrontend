package com.junk.management.dto;

import com.junk.management.constant.AppConstants;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UserDetailsDto {

  @NotBlank(message = AppConstants.FIRST_NAME_MANDATORY)
  private String firstName;

  private String lastName;

  private String email;

  private List<UserAddressDTO> address;

  @NotBlank(message = AppConstants.PHONE_NUMBER_MANDATORY)
  @Pattern(regexp = AppConstants.PHONE_NUMBER_REGEX, message = AppConstants.PHONE_NUMBER_FORMAT)
  private String phoneNumber;

}
