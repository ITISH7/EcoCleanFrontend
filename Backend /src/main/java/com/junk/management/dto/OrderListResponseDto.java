package com.junk.management.dto;

import java.time.LocalDate;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderListResponseDto {

  private UUID orderId;
  private LocalDate orderDate;
  private Double totalPrice;
  private String address;
}
