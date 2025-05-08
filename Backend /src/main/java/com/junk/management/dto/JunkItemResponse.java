package com.junk.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JunkItemResponse {

  private String junkType;
  private Double weight;
  private Double unitPrice;
  private Double estimatedPrice;
}
