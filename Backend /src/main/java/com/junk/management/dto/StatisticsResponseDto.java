package com.junk.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticsResponseDto {

  private long completedOrders;
  private long pendingOrders;
  private long cancelledOrders;
  private long ongoingOrders;
}
