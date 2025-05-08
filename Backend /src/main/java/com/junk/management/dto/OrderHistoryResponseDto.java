package com.junk.management.dto;

import com.junk.management.model.Status;
import java.time.LocalDate;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderHistoryResponseDto {

  private UUID orderId;
  private Status status;
  private LocalDate orderDate;
  private Double totalPrice;

}
