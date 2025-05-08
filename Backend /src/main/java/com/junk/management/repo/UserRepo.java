package com.junk.management.repo;

import com.junk.management.model.Role;
import com.junk.management.model.User;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<User, UUID> {

  Optional<User> findByPhoneNumber(String phoneNumber);

  Optional<User> findByEmail(String email);

  @Query(value = "SELECT u.role, COUNT(*) FROM users u WHERE u.is_active= true group by u.role", nativeQuery = true)
  List<Object[]> findAllByRoleAndIsActive();

  Page<User> findAll(Pageable pageable);

  Page<User> findAllByRole(Role role,Pageable pageable);

  Page<User> findAllByIsActive(Boolean isActive,Pageable pageable);

  Page<User> findByEmailContainingIgnoreCase(String email, Pageable pageable);
}
