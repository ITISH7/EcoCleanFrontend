package com.junk.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminListDto {

  private String email;
  private String firstName;
  private String lastName;
  private String phoneNumber;
}
