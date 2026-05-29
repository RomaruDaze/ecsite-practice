package com.example.controller;

import com.example.domain.Item;
import com.example.domain.User;
import com.example.repository.CartRepository;
import com.example.service.CartService;
import com.example.service.ItemService;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {
    @Autowired
    private ItemService itemService;//Service Class

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

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

    @PostMapping("/user/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Map<String, Object> response = new HashMap<>();
        try {
            User user = userService.findByEmailAndPassword(email, password);
            response.put("user", user);
            response.put("success", user != null);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Invalid email or password");
        }
        return response;
    }

    @PostMapping("/user/register")
    public Map<String, Object> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            userService.register(user);
            response.put("success", true);
            response.put("message", "User registered successfully");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
        }
        return response;
    }

    /*
    * Cart API
    * */
    @GetMapping("/cart/fetch-all/{id}")
    public Map<String, List<Item>> fetchUsers(@PathVariable Integer id) {
        Map<String, List<Item>> response = new HashMap<>();
        response.put("users", itemService.fetchAllCartItem(id));
        return response;
    }

    @PostMapping("/cart/add-to-cart")
    public Map<String, Object> addToCart(@RequestParam("userid") Integer userId,
                                         @RequestParam("itemid") Integer itemId) {
        Map<String, Object> response = new HashMap<>();
        try {
            cartService.addItemToCart(userId, itemId);
            response.put("success", true);
            response.put("message", "Item added to cart successfully");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to add item to cart: " + e.getMessage());
        }
        return response;
    }

    @DeleteMapping("/cart/remove-from-cart")
    public Map<String, Object> removeFromCart(@RequestParam("userid") Integer userId, @RequestParam("itemid") Integer itemId) {
        Map<String, Object> response = new HashMap<>();
        try {
            cartService.removeItemFromCart(userId, itemId);
            response.put("success", true); //  Add this line
            response.put("message", "Item removed from cart successfully"); // Optional
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to remove item: " + e.getMessage());
        }
        return response;
    }

    @PostMapping("/cart/checkout/{id}")
    public Map<String, Object> checkout(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        try {
            // 1. ユーザー情報の取得（Streamを使わないループ処理）
            List<User> allUsers = userService.fetchAllUsers();
            User targetUser = null;

            for (User u : allUsers) {
                if (u.getId() != null && u.getId().equals(id)) {
                    targetUser = u;
                    break;
                }
            }

            if (targetUser == null) {
                response.put("success", false);
                response.put("message", "ユーザーが見つかりませんでした。");
                return response;
            }

            // 2. カートリポジトリ経由のSQLチェックアウト処理を呼び出し
            return cartService.checkoutCart(targetUser.getId(), targetUser.getEmail(), targetUser.getName());

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "チェックアウト中にエラーが発生しました: " + e.getMessage());
            return response;
        }
    }
}
