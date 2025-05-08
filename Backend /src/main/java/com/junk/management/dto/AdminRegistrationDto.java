package com.junk.management.dto;

import com.junk.management.constant.AppConstants;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminRegistrationDto {

  @NotBlank(message = AppConstants.FIRST_NAME_MANDATORY)
  private String firstName;

  private String lastName;

  @NotBlank(message = AppConstants.PASSWORD_NOT_NULL)
  @Pattern(regexp = AppConstants.PASSWORD_REGEX, message = AppConstants.PASSWORD_MANDATORY)
  private String password;

  @NotBlank(message = AppConstants.EMAIL_NOT_NULL)
  @Email(message = AppConstants.EMAIL_VALIDATION)
  private String email;

  private String phoneNumber;
}
