package com.junk.management.service.impl;

import com.junk.management.constant.AppConstants;
import com.junk.management.dto.JunkDto;
import com.junk.management.dto.JunkResponseDto;
import com.junk.management.exception.DuplicateJunkTypeException;
import com.junk.management.exception.EntityNotFoundException;
import com.junk.management.exception.InvalidJunkCategoryException;
import com.junk.management.exception.JunkEntryFailedException;
import com.junk.management.model.Junk;
import com.junk.management.repo.JunkRepo;
import com.junk.management.service.JunkService;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JunkServiceImpl implements JunkService {

  @Autowired
  private JunkRepo junkRepo;

  @Secured("ROLE_ADMIN")
  public void enterJunkDetails(JunkDto junkDto) {
    try {
      Optional<Junk> existingJunk = junkRepo.findByJunkType(junkDto.getJunkType());
      if (existingJunk.isPresent()) {
        throw new DuplicateJunkTypeException(
            AppConstants.DUPLICATE_JUNK_TYPE + junkDto.getJunkType());
      }
      if (junkDto.getJunkCategory().equalsIgnoreCase("recyclable") || junkDto.getJunkCategory()
          .equalsIgnoreCase("non-recyclable")) {
        Junk junk = new Junk(junkDto.getJunkType().toUpperCase(), junkDto.getJunkCategory(),
            junkDto.getUnitPrice());
        log.info(AppConstants.JUNK_ENTERED);
        junkRepo.save(junk);
      } else {
        throw new InvalidJunkCategoryException(AppConstants.VALID_JUNK_CATEGORY);
      }
    } catch (Exception e) {
      log.error(AppConstants.JUNK_ERROR_MESSAGE + e.getMessage());
      throw new JunkEntryFailedException(AppConstants.FAILED_TO_ENTER_JUNK + e.getMessage());
    }
  }

  @Secured("ROLE_ADMIN")
  @Override
  public void updateJunkDetails(JunkDto junkDto) {
    Junk junk = junkRepo.findByJunkType(junkDto.getJunkType().toUpperCase()).orElseThrow(() -> {
      log.error(AppConstants.JUNK_NOT_FOUND);
      return new EntityNotFoundException(AppConstants.JUNK_NOT_FOUND);
    });
    if (junkDto.getJunkCategory() == null || !(
        junkDto.getJunkCategory().equalsIgnoreCase("recyclable") || junkDto.getJunkCategory()
            .equalsIgnoreCase("non-recyclable"))) {
      log.error(AppConstants.VALID_JUNK_CATEGORY);
      throw new IllegalArgumentException(AppConstants.VALID_JUNK_CATEGORY);
    }
    if (junkDto.getUnitPrice() == null) {
      log.error(AppConstants.UNIT_PRICE_NOT_NULL);
      throw new IllegalArgumentException(AppConstants.UNIT_PRICE_NOT_NULL);
    }
    if (junkDto.getJunkCategory().equalsIgnoreCase(junk.getJunkCategory()) && junkDto.getUnitPrice()
        .equals(junk.getUnitPrice())) {
      throw new IllegalArgumentException(AppConstants.DATA_NOT_UPDATED);
    }
    junkRepo.save(junk);
  }

  @Secured("ROLE_ADMIN")
  @Override
  public void removeJunkDetails(String junkType) {
    Junk junk = junkRepo.findByJunkType(junkType.toUpperCase()).orElseThrow(() -> {
      log.error(AppConstants.JUNK_NOT_FOUND);
      return new EntityNotFoundException(AppConstants.JUNK_NOT_FOUND);
    });
    junkRepo.delete(junk);
  }

  @Override
  public Page<JunkResponseDto> fetchJunkDetails(Pageable pageable) {
    Page<Junk> junkItems = junkRepo.findAll(pageable);
    if (junkItems.isEmpty() && pageable.getPageNumber() > 0) {
      throw new NoSuchElementException(AppConstants.INVALID_PAGE_NUMBER);
    }
    return junkItems.map(
        junkItem -> new JunkResponseDto(junkItem.getJunkType(), junkItem.getUnitPrice()));
  }
}
