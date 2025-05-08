package com.junk.management.dto;

import com.junk.management.constant.AppConstants;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {

  @NotNull(message = AppConstants.ADDRESS_ID_NOT_BLANK)
  private Long addressId;

  @NotEmpty(message = AppConstants.JUNK_ITEM_NOT_NULL)
  @Valid
  private List<JunkItemRequest> junkItems;

}


