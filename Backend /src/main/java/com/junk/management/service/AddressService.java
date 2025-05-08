package com.junk.management.service;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.dto.UserAddressDTO;
import java.util.List;

public interface AddressService {

  void addNewAddress(UserAddressDTO userAddressDTO, CustomUserDetails customUserDetails);

  List<UserAddressDTO> getAddressList(CustomUserDetails customUserDetails);

  void deleteAddress(Long addressId, CustomUserDetails customUserDetails);

  void updateCurrentAddress(Long addressID, UserAddressDTO userAddressDTO,
      CustomUserDetails customUserDetails);

  void changePrimaryAddress(Long addressId, CustomUserDetails customUserDetails);
}
