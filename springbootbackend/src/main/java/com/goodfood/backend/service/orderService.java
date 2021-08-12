package com.goodfood.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goodfood.backend.exception.OrderNotFoundException;
import com.goodfood.backend.model.Order;
import com.goodfood.backend.repository.orderRepository;
 
@Service
public class orderService {
     
    @Autowired
    orderRepository repository;
     
    public List<Order> getAllOrders()
    {
        List<Order> orderList = repository.findAll();
         
        if(orderList.size() > 0) {
            return orderList;
        } else {
            return new ArrayList<Order>();
        }
    }
     
    public Order getOrderById(Long id) throws OrderNotFoundException
    {
        Optional<Order> order = repository.findById(id);
         
        if(order.isPresent()) {
            return order.get();
        } else {
            throw new OrderNotFoundException("No order found for given id");
        }
    }
     
    public Order createOrder(Order o) throws OrderNotFoundException
    {
            return repository.save(o);
    }
     
    public void deleteOrderById(Long id) throws OrderNotFoundException
    {
        Optional<Order> o = repository.findById(id);
         
        if(o.isPresent())
        {
            repository.deleteById(id);
        } else {
            throw new OrderNotFoundException("No order found for given id");
        }
    }
}