package com.goodfood.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderReview {

    private OrderTable od;
    private Double subtotal;
    private Integer count;
}
