package com.goodfood.backend.repository;

import com.goodfood.backend.model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface orderDetailsRepository extends JpaRepository<OrderDetails, Long> {
}
