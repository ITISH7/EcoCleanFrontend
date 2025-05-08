package com.junk.management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Orders")
public class Order {


  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID orderId;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name="merchant_id")
  private User merchant;

  @OneToMany(mappedBy = "order")
  private List<JunkItem> junkItems;

  private Double totalRewards;

  private LocalDate orderDate;

  private Boolean isDeleted;

  @Enumerated(EnumType.STRING)
  private Status status;

  private Long addressId;

  public Order(User user, LocalDate orderDate, Status status, Long addressId, Boolean isDeleted) {
    this.user = user;
    this.orderDate = orderDate;
    this.status = status;
    this.addressId = addressId;
    this.isDeleted = isDeleted;
  }
}



