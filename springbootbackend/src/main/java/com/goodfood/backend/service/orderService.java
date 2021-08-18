package com.goodfood.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.goodfood.backend.model.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goodfood.backend.exception.OrderNotFoundException;
import com.goodfood.backend.model.OrderTable;
import com.goodfood.backend.repository.orderRepository;
import com.goodfood.backend.repository.menuRepository;
 
@Service
public class orderService {
     
    @Autowired
    orderRepository repository;

    @Autowired
    menuRepository menuRepo;
     
    public List<OrderTable> getAllOrders()
    {
        List<OrderTable> orderTableList = repository.findAll();
         
        if(orderTableList.size() > 0) {
            return orderTableList;
        } else {
            return new ArrayList<OrderTable>();
        }
    }
     
    public OrderTable getOrderById(Long id) throws OrderNotFoundException
    {
        Optional<OrderTable> order = repository.findById(id);
         
        if(order.isPresent()) {
            return order.get();
        } else {
            throw new OrderNotFoundException("No order found for given id");
        }
    }
     
    public OrderTable createOrder(OrderTable o) throws OrderNotFoundException
    {
            return repository.save(o);
    }
     
    public void deleteOrderById(Long id) throws OrderNotFoundException
    {
        Optional<OrderTable> o = repository.findById(id);
         
        if(o.isPresent())
        {
            repository.deleteById(id);
        } else {
            throw new OrderNotFoundException("No order found for given id");
        }
    }

    public void deleteAllOrders() {
        repository.deleteAll();
    }

    public List<Menu> getMenu() {
        return menuRepo.findAll();
    }
}