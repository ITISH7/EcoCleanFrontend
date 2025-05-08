package com.junk.management.dto;

import com.junk.management.constant.AppConstants;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JunkDto {

  @NotBlank(message = AppConstants.JUNK_TYPE_NOT_NULL)
  private String junkType;

  @NotBlank(message = AppConstants.JUNK_CATEGORY_NOT_NULL)
  private String junkCategory;

  @NotNull(message = AppConstants.UNIT_PRICE_NOT_NULL)
  private Double unitPrice;

}
