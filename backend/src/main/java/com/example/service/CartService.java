package com.example.service;

import com.example.domain.Cart;
import com.example.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public void addItemToCart(Integer userId, Integer itemId) {
        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.setItemId(itemId);
        cartRepository.addToCart(cart);
    }

    public void removeItemFromCart(Integer userId, Integer itemId) {
        cartRepository.removeFromCart(userId, itemId);
    }

    public Map<String, Object> checkoutCart(Integer userId, String email, String name) {
        return cartRepository.processCheckout(userId, email, name);
    }
}
