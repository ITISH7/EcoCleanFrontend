package com.junk.management.repo;

import com.junk.management.model.Order;
import com.junk.management.model.Status;
import com.junk.management.model.User;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends JpaRepository<Order, UUID> {

  Page<Order> findByUserAndStatusNot(User user, Status status, Pageable pageable);

  @Query(value = "SELECT o FROM Order o WHERE o.user = :user "
      + "AND (COALESCE(:startDate, o.orderDate) <= o.orderDate) "
      + "AND (COALESCE(:endDate, o.orderDate) >= o.orderDate) "
      + "AND (:minPrice IS NULL OR o.totalRewards >= :minPrice)"
      + "AND (:maxPrice IS NULL OR o.totalRewards <= :maxPrice)"
      + "AND (:status IS NULL OR o.status = :status)")
  Page<Order> findOrdersByDateAndPriceRangeAndStatus(@Param("user") User user, Pageable pageable,
      @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate,
      @Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice,
      @Param("status") Status status);

  @Query(value = "SELECT o FROM Order o WHERE "
      + "(COALESCE(:startDate, o.orderDate) <= o.orderDate) "
      + "AND (COALESCE(:endDate, o.orderDate) >= o.orderDate) "
      + "AND (:minPrice IS NULL OR o.totalRewards >= :minPrice)"
      + "AND (:maxPrice IS NULL OR o.totalRewards <= :maxPrice)"
      + "AND (:status IS NULL OR o.status = :status)")
  Page<Order> fetchOrdersByDateAndPriceRangeAndStatus(Pageable pageable,
      @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate,
      @Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice,
      @Param("status") Status status);

  Page<Order> findByUserAndStatus(User user, Status status, Pageable pageable);

  List<Order> findByUserAndStatus(User user, Status status);

  List<Order> findOrdersByUserAndStatusIn(User user, Set<Status> status);

  boolean existsByMerchant_UserId(UUID merchantId);

  @Query("SELECT COALESCE(SUM(o.totalRewards), 0) FROM Order o WHERE o.merchant = :merchant AND o.status = :status")
  Double findTotalRewardsByMerchantAndStatus(@Param("merchant") User merchant,
      @Param("status") Status status);

  @Query("SELECT o.status, COUNT(o) FROM Order o WHERE o.merchant.id = :merchantId AND o.status IN (:statuses) GROUP BY o.status")
  List<Object[]> countOrdersByStatus(@Param("merchantId") UUID merchantId,
      @Param("statuses") Status... statuses);

  @Query("SELECT o FROM Order o WHERE o.status = :status AND NOT EXISTS " +
      "(SELECT om FROM OrderMerchantMapping om WHERE om.orderId = o.orderId AND om.merchantId = :merchantId)")
  Page<Order> findUnmappedOrders(Pageable pageable, @Param("status") Status status,
      @Param("merchantId") UUID merchantId);


  @Query("SELECT o.status, COUNT(o) FROM Order o WHERE o.user = :user GROUP BY o.status")
  List<Object[]> countOrdersByStatusForUser(@Param("user") User user);

  List<Order> findOrdersByStatus(Status status);
}

