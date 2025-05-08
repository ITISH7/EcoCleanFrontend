package com.junk.management.repo;

import com.junk.management.model.UserSession;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSessionRepo extends JpaRepository<UserSession, UUID> {

  void deleteByUserId(UUID userId);

  Optional<UserSession> findByJwtToken(String jwtToken);

  void deleteByJwtToken(String jwtToken);
}
