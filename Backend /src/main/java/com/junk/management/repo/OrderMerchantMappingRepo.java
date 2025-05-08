package com.junk.management.repo;

import com.junk.management.model.OrderMerchantMapping;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderMerchantMappingRepo extends JpaRepository<OrderMerchantMapping, Long> {

  boolean existsByMerchantIdAndOrderId(UUID merchantId, UUID orderId);

  @Query("SELECT om.orderId FROM OrderMerchantMapping om WHERE om.merchantId = :merchantId AND om.isRejected = :isRejected")
  Page<UUID> findOrderIdsByMerchantIdAndIsRejected(@Param("merchantId") UUID merchantId,
      Pageable pageable, @Param("isRejected") boolean isRejected);

  OrderMerchantMapping findByOrderId(UUID orderId);
}
