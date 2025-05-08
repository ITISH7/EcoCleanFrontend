package com.junk.management.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.junk.management.Security.JwtUtil;
import com.junk.management.constant.AppConstants;
import com.junk.management.model.UserSession;
import com.junk.management.repo.UserSessionRepo;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

  @Autowired
  @Lazy
  private UserDetailsService userDetailsService;

  @Autowired
  private UserSessionRepo userSessionRepo;

  @Autowired
  private JwtUtil jwtUtil;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    String authorizationHeader = request.getHeader("Authorization");
    String email = null;
    String jwt = null;
    String message = null;

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer")) {
      jwt = authorizationHeader.substring(7);
      try {
        email = jwtUtil.extractEmail(jwt);
      } catch (IllegalArgumentException e) {
        logger.warn(AppConstants.UNABLE_TO_GET_TOKEN);
      } catch (ExpiredJwtException e) {
        message = AppConstants.TOKEN_GOT_EXPIRED;
      }
    }

    if (message != null) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      new ObjectMapper().writeValue(response.getWriter(), message);
      return;
    }

    if (email != null) {
      UserDetails userDetails = userDetailsService.loadUserByUsername(email);
      Optional<UserSession> userSession = userSessionRepo.findByJwtToken(jwt);
      if (userSession.isEmpty()) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        logger.warn(AppConstants.SESSION_EXPIRED_MESSAGE);
        response.getWriter().write(AppConstants.SESSION_EXPIRED_MESSAGE);
        return;
      }
      if (jwtUtil.validateToken(jwt)) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
            userDetails, null, userDetails.getAuthorities());
        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(auth);
      } else {
        userSessionRepo.deleteByJwtToken(jwt);
      }
    }
    filterChain.doFilter(request, response);
  }
}


