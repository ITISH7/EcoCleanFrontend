package com.junk.management.dto;

import com.junk.management.constant.AppConstants;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {

  @NotBlank(message = AppConstants.FIRST_NAME_MANDATORY)
  private String firstName;

  private String lastName;

  @NotBlank(message = AppConstants.PASSWORD_NOT_NULL)
  @Pattern(regexp = AppConstants.PASSWORD_REGEX, message = AppConstants.PASSWORD_MANDATORY)
  private String password;

  @NotBlank(message = AppConstants.EMAIL_NOT_NULL)
  @Email(message = AppConstants.EMAIL_VALIDATION)
  private String email;

  @NotEmpty(message = AppConstants.ADDRESS_MANDATORY)
  private List<UserAddressDTO> address;

  @NotBlank(message = AppConstants.PHONE_NUMBER_MANDATORY)
  @Pattern(regexp = AppConstants.PHONE_NUMBER_REGEX, message = AppConstants.PHONE_NUMBER_FORMAT)
  private String phoneNumber;

  @NotBlank(message = AppConstants.ROLE_MANDATORY)
  private String role;
}

