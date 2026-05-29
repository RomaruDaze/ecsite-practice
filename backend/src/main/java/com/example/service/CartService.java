package com.example.service;

import com.example.domain.Cart;
import com.example.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
