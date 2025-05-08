package com.junk.management.model;

import com.junk.management.dto.UserAddressDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Address {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long addressId;

  private String houseNumber;

  private String locality;

  private String street;

  private String city;

  private String state;

  private String pinCode;

  private String country;

  @Enumerated(EnumType.STRING)
  private AddressType addressType;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  public Address(User user, UserAddressDTO dto) {
    this.user = user;
    this.houseNumber = dto.getHouseNumber();
    this.locality = dto.getLocality();
    this.street = dto.getStreet();
    this.city = dto.getCity();
    this.state = dto.getState();
    this.pinCode = dto.getPinCode();
    this.country = dto.getCountry();
  }
}
