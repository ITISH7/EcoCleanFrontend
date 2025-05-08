package com.junk.management.dto;

import com.junk.management.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserListDto {

  private String email;
  private String firstName;
  private String lastName;
  private Role role;
}
