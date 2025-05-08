package com.junk.management.dto;

import com.junk.management.constant.AppConstants;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDto {

  @NotBlank(message = AppConstants.PASSWORD_NOT_NULL)
  private String oldPassword;

  @NotBlank(message = AppConstants.PASSWORD_NOT_NULL)
  @Pattern(regexp = AppConstants.PASSWORD_REGEX, message = AppConstants.PASSWORD_MANDATORY)
  private String newPassword;
}
