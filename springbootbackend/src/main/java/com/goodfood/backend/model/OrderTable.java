package com.goodfood.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderTable {

    @Id
    private Long id;

    @OneToMany(targetEntity = OrderDetails.class, cascade = CascadeType.ALL)
    @JoinColumn(name="tableId", referencedColumnName = "id")
    private List<OrderDetails> orderItems;

}