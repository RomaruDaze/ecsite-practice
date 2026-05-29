package com.example.controller;

import com.example.domain.Item;
import com.example.domain.User;
import com.example.service.ItemService;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ApiController {
    @Autowired
    private ItemService itemService;//Service Class

    @Autowired
    private UserService userService;

    @GetMapping("/hello")
    public Map<String, String> getHelloMessage() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from Spring Boot!");
        return response;
    }

    /*
    * Item API
    * */
    @GetMapping("/fetch-all")
    public Map<String,List<Item>> fetchAllItems() {
        Map<String, List<Item>> response = new HashMap<>();
        response.put("items", itemService.fetchAllItems());
        return response;
    }

    @GetMapping("/fetch-item/{id}")
    public Map<String, Item> fetchItemsById(@PathVariable Integer id) {
        Map<String, Item> response = new HashMap<>();
        response.put("item", itemService.fetchItemById(id));
        return response;
    }

    @GetMapping("/search-item/{name}")
    public Map<String, List<Item>> fetchItemsByName(@PathVariable String name) {
        Map<String, List<Item>> response = new HashMap<>();
        response.put("item", itemService.fetchItemByName(name));
        return response;
    }

    /*
     * User API
     * */
    @GetMapping("/user/fetch-all")
    public Map<String, List<User>> fetchUsers() {
        Map<String, List<User>> response = new HashMap<>();
        response.put("users", userService.fetchAllUsers());
        return response;
    }

    @GetMapping("/user/login")
    public Map<String,User> login(@RequestParam String email, @RequestParam String password) {
        Map<String,User> response = new HashMap<>();
        response.put("user", userService.findByEmailAndPassword(email, password));
        return response;
    }
}
