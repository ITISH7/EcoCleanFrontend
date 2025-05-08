package com.junk.management.repo;

import com.junk.management.model.Address;
import com.junk.management.model.AddressType;
import com.junk.management.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AddressRepo extends JpaRepository<Address, Long> {

  List<Address> findByUser(User user);

  Optional<Address> findByUserAndAddressType(User user, AddressType addressType);

  Optional<Address> findByUserAndHouseNumberAndLocalityAndStreetAndCityAndStateAndPinCodeAndCountry(
      User user, String houseNumber, String locality, String street, String city, String state,
      String pinCode, String country);

  Optional<Address> findById(Long addressId);
}
