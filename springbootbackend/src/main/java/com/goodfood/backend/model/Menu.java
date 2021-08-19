package com.goodfood.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "Menu")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Menu {

    @Id
    private Long id;

    @Column(name = "item")
    private String item;

    @Column(name = "price")
    private Double price;
}
