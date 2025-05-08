package com.junk.management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Junk {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID junkId;

  private String junkType;

  private String junkCategory;

  private Double unitPrice;

  public Junk(String junkType, String junkCategory, Double unitprice) {
    this.junkType = junkType;
    this.junkCategory = junkCategory;
    this.unitPrice = unitprice;
  }
}
