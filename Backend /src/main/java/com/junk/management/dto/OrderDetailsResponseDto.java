package com.junk.management.dto;

import com.junk.management.model.Status;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsResponseDto {
  private UUID orderId;
  private Status status;
  private LocalDate orderDate;
  private Double totalPrice;
  private UserAddressDTO address;
  private List<JunkItemResponse> junkItems;
  private UserDetailsResponseDto userDetails;
  private UserDetailsResponseDto merchantDetails;
}
