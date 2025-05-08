package com.junk.management.controller;

import com.junk.management.Security.CustomUserDetails;
import com.junk.management.constant.AppConstants;
import com.junk.management.dto.UserAddressDTO;
import com.junk.management.service.AddressService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/address")
public class AddressController {

  @Autowired
  private AddressService addressService;

  @PostMapping
  public ResponseEntity<?> addNewAddress(@Valid @RequestBody UserAddressDTO userAddressDTO,
      @AuthenticationPrincipal CustomUserDetails customUserDetails)
      throws Exception {
    addressService.addNewAddress(userAddressDTO, customUserDetails);
    return ResponseEntity.ok(AppConstants.ADDRESS_ADDED_MESSAGE);
  }

  @GetMapping
  public ResponseEntity<?> getAddressList(
      @AuthenticationPrincipal CustomUserDetails customUserDetails) throws Exception {
    List<UserAddressDTO> list = addressService.getAddressList(customUserDetails);
    return ResponseEntity.ok(list);
  }

  @DeleteMapping("/{addressId}")
  public ResponseEntity<?> deleteAddress(@PathVariable Long addressId,
      @AuthenticationPrincipal CustomUserDetails customUserDetails) throws Exception {
    addressService.deleteAddress(addressId, customUserDetails);
    return ResponseEntity.ok(AppConstants.ADDRESS_REMOVED_MESSAGE);
  }

  @PutMapping("/{addressId}")
  public ResponseEntity<?> updateCurrentAddress(@PathVariable Long addressId,
      @RequestBody UserAddressDTO userAddressDTO,
      @AuthenticationPrincipal CustomUserDetails customUserDetails) throws Exception {
    addressService.updateCurrentAddress(addressId, userAddressDTO, customUserDetails);
    return ResponseEntity.ok(AppConstants.ADDRESS_UPDATED_MESSAGE);
  }

  @PutMapping("/change-primary-address/{addressId}")
  public ResponseEntity<String> changePrimaryAddress(@PathVariable Long addressId,
      @AuthenticationPrincipal CustomUserDetails customUserDetails) {
    addressService.changePrimaryAddress(addressId, customUserDetails);
    return ResponseEntity.ok(AppConstants.PRIMARY_ADDRESS_CHANGED);
  }
}
