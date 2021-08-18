package com.goodfood.backend.controller;

import java.util.List;

import com.goodfood.backend.model.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.goodfood.backend.exception.OrderNotFoundException;
import com.goodfood.backend.model.OrderTable;
import com.goodfood.backend.service.orderService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/restapi")
public class orderController {

    @Autowired
    orderService service;
 
    @GetMapping("/orders")
    public ResponseEntity<List<OrderTable>> getAllOrders() {
        List<OrderTable> list = service.getAllOrders();
 
        return new ResponseEntity<List<OrderTable>>(list, new HttpHeaders(), HttpStatus.OK);
    }
 
    @GetMapping("/orders/{id}")
    public ResponseEntity<OrderTable> getOrderById(@PathVariable("id") Long id)
                                                    throws OrderNotFoundException {
        OrderTable entity = service.getOrderById(id);
 
        return new ResponseEntity<OrderTable>(entity, new HttpHeaders(), HttpStatus.OK);
    }
 
    @PostMapping("/orders")
    public ResponseEntity<OrderTable> createOrder(@RequestBody OrderTable o)
                                                    throws OrderNotFoundException {
        OrderTable newOrderTable = service.createOrder(o);
        return new ResponseEntity<OrderTable>(newOrderTable, new HttpHeaders(), HttpStatus.OK);
    }
 
    @DeleteMapping("/orders/{id}")
    public HttpStatus deleteOrderById(@PathVariable("id") Long id)
                                                    throws OrderNotFoundException {
        service.deleteOrderById(id);
        return HttpStatus.OK;
    }

    @DeleteMapping("/orders/all")
    public String deleteOrderById() {
        service.deleteAllOrders();
        return "All orders deleted from database";

    }

    @GetMapping("/menu")
    public ResponseEntity<List<Menu>> getMenu() {
        List<Menu> list = service.getMenu();

        return new ResponseEntity<List<Menu>>(list, new HttpHeaders(), HttpStatus.OK);
    }
 
}