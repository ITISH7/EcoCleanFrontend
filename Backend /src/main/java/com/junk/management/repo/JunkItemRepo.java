package com.junk.management.repo;

import com.junk.management.model.JunkItem;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface JunkItemRepo extends JpaRepository<JunkItem, UUID> {

  @Modifying
  @Transactional
  @Query("UPDATE JunkItem j SET j.weight = :weight, j.estimatedPrice = :estimatedPrice, j.unitPrice = :unitPrice WHERE j.order.id = :orderId AND j.junkType = :junkType")
  int updateJunkItem(@Param("orderId") UUID orderId,
      @Param("junkType") String junkType,
      @Param("weight") double weight,
      @Param("unitPrice") double unitPrice,
      @Param("estimatedPrice") double estimatedPrice);

  @Modifying
  @Transactional
  void deleteByOrder_OrderId(UUID orderId);
}
