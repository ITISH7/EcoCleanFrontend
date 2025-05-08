package com.junk.management.service;

import com.junk.management.dto.AdminListDto;
import com.junk.management.dto.AdminRegistrationDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SuperAdminService {

  void registerAdmin(AdminRegistrationDto adminRegistrationDto);

  Page<AdminListDto> fetchUserList(Pageable pageable);

  void removeAdmin(String email);
}
