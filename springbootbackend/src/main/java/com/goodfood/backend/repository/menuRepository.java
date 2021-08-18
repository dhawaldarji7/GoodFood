package com.goodfood.backend.repository;

import com.goodfood.backend.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface menuRepository extends JpaRepository<Menu, Long> {
}
