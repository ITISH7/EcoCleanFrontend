package com.junk.management.service;

import com.junk.management.dto.JunkDto;
import com.junk.management.dto.JunkResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface JunkService {

  void enterJunkDetails(JunkDto junkDto);

  void updateJunkDetails(JunkDto junkDto);

  void removeJunkDetails(String junkType);

  Page<JunkResponseDto> fetchJunkDetails(Pageable pageable);
}
