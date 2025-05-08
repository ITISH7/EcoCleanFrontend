package com.junk.management.Security;

import com.junk.management.model.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

  private final SecretKey secretKey;

  public JwtUtil(@Value("${jwt.secret}") String secret)  {
    byte[] keyBytes = Decoders.BASE64.decode(secret);
    this.secretKey = Keys.hmacShaKeyFor(keyBytes);
  }

  public Date extractExpiration(String token) {

    return extractAllClaims(token).getExpiration();
  }

  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  public String generateToken(String email, Role role) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("role",role.name());
    return createToken(claims, email);
  }

  private String createToken(Map<String, Object> claims, String subject) {
    return Jwts.builder().claims(claims).subject(subject).header().empty().add("typ", "JWT").and()
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 20)).signWith(secretKey)
        .compact();
  }

  public String extractEmail(String token) {
    Claims claims = extractAllClaims(token);
    return claims.getSubject();
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
  }

  public Boolean validateToken(String token) {
    return !isTokenExpired(token);
  }
}
