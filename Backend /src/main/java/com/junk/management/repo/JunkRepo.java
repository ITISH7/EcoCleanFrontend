package com.junk.management.repo;

import com.junk.management.model.Junk;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JunkRepo extends JpaRepository<Junk, Long> {

  Optional<Junk> findByJunkType(String junkType);
}
