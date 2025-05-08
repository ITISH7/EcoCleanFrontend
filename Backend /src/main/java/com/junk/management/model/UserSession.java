package com.junk.management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.Instant;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UserSession {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID tokenId;
  private UUID userId;
  private String jwtToken;
  private Instant createdAt;

  public UserSession(UUID userId, String jwtToken) {
    this.userId = userId;
    this.jwtToken = jwtToken;
    this.createdAt = Instant.now();
  }
}
