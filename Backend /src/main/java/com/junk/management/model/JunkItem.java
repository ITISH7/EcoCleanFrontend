package com.junk.management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "junk_items")
public class JunkItem {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID itemId;

  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  private Order order;

  private String junkType;
  private Double weight;
  private Double unitPrice;
  private Double estimatedPrice;

  public JunkItem(Order order, String junkType, Double weight, Double unitPrice,
      Double estimatedPrice) {
    this.order = order;
    this.junkType = junkType;
    this.weight = weight;
    this.unitPrice = unitPrice;
    this.estimatedPrice = estimatedPrice;
  }

}
