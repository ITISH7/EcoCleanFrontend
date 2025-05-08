package com.junk.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsResponseDto {

  private String firstName;

  private String lastName;

  private String email;

  private String phoneNumber;

}
