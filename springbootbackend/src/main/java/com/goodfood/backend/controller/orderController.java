package com.goodfood.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.goodfood.backend.exception.OrderNotFoundException;
import com.goodfood.backend.model.Order;
import com.goodfood.backend.service.orderService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/restapi")
public class orderController {

    @Autowired
    orderService service;
 
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> list = service.getAllOrders();
 
        return new ResponseEntity<List<Order>>(list, new HttpHeaders(), HttpStatus.OK);
    }
 
    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable("id") Long id)
                                                    throws OrderNotFoundException {
        Order entity = service.getOrderById(id);
 
        return new ResponseEntity<Order>(entity, new HttpHeaders(), HttpStatus.OK);
    }
 
    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order o)
                                                    throws OrderNotFoundException {
        Order newOrder = service.createOrder(o);
        return new ResponseEntity<Order>(newOrder, new HttpHeaders(), HttpStatus.OK);
    }
 
    @DeleteMapping("/orders/{id}")
    public HttpStatus deleteOrderById(@PathVariable("id") Long id)
                                                    throws OrderNotFoundException {
        service.deleteOrderById(id);
        return HttpStatus.OK;
    }
 
}