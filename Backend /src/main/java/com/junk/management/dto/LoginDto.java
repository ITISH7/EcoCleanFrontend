package com.junk.management.dto;

import com.junk.management.constant.AppConstants;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {

  @Email(message = AppConstants.EMAIL_VALIDATION)
  @NotBlank(message = AppConstants.EMAIL_NOT_NULL)
  private String email;

  @NotBlank(message = AppConstants.PASSWORD_MANDATORY)
  private String password;

}
