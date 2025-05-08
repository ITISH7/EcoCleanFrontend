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
public class JunkItemRequest {

  @NotBlank(message = AppConstants.JUNK_TYPE_NOT_NULL)
  private String junkType;

  @NotNull(message = AppConstants.WEIGHT_NOT_NULL)
  private Double weight;
}
