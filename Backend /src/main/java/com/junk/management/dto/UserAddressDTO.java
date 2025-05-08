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
public class UserAddressDTO {

  private Long addressId;

  @NotBlank(message = AppConstants.HOUSE_NUMBER_MANDATORY)
  private String houseNumber;
  private String locality;
  private String street;

  @NotBlank(message = AppConstants.CITY_NAME_MANDATORY)
  private String city;

  @NotBlank(message = AppConstants.STATE_NAME_MANDATORY)
  private String state;

  @NotBlank(message = AppConstants.PIN_CODE_MANDATORY)
  @Pattern(regexp = AppConstants.PIN_CODE_REGEX, message = AppConstants.PIN_CODE_VALIDATION)
  private String pinCode;

  @NotBlank(message = AppConstants.COUNTRY_NAME_MANDATORY)
  private String country;

}

