package com.goodfood.backend.repository;

import com.goodfood.backend.model.OrderTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface orderRepository extends JpaRepository<OrderTable, Long> { }
