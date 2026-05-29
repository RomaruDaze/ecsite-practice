package com.example.repository;

import com.example.domain.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CartRepository {
    @Autowired
    private NamedParameterJdbcTemplate template;

    private static final RowMapper<Cart> ROW_MAPPER = (rs, i) -> {
        Cart cart = new Cart();
        cart.setId(rs.getInt("id"));
        cart.setUserId(rs.getInt("user_id"));
        cart.setItemId(rs.getInt("item_id"));
        return cart;
    };

    public void addToCart(Cart cart) {
        SqlParameterSource param = new BeanPropertySqlParameterSource(cart);

        if (cart.getId() == null) {
            String insertSql = "INSERT INTO cart (user_id,item_id) " +
                    "VALUES (:userId,:itemId)";

            KeyHolder keyHolder = new GeneratedKeyHolder();
            String[] keyColumnsNames = {"id"};
            template.update(insertSql, param, keyHolder, keyColumnsNames);
            cart.setId(keyHolder.getKey().intValue());
            System.out.println(keyHolder.getKey() + "が割り当てられました。");
        } else {
            String updateSql = "UPDATE cart " +
                    "SET user_id=:userId,item_id=:itemId " +
                    "WHERE id = :id";

            template.update(updateSql, param);
        }
    }

    public void removeFromCart(Integer userId, Integer itemId) {
        System.out.println("Remove");
        String sql = "DELETE FROM cart WHERE user_id = :userId AND item_id = :itemId";
        SqlParameterSource param = new MapSqlParameterSource().addValue("userId", userId ).addValue("itemId", itemId);
        template.update(sql, param);
    }

    public Map<String, Object> processCheckout(Integer userId, String userEmail, String userName) {
        Map<String, Object> results = new java.util.HashMap<>();

        // 1. SQL Query to fetch all items currently in this user's cart via a JOIN
        String fetchSql = "SELECT i.name, i.price FROM cart c " +
                "JOIN items i ON c.item_id = i.id " +
                "WHERE c.user_id = :userId";

        SqlParameterSource param = new MapSqlParameterSource().addValue("userId", userId);

        // Execute query and extract mapping pairs manually
        List<Map<String, Object>> rows = template.queryForList(fetchSql, param);

        if (rows.isEmpty()) {
            results.put("success", false);
            results.put("message", "Your cart is empty.");
            return results;
        }

        // 2. Compute Total Price without using Stream API (Standard loop logic)
        int totalAmount = 0;
        List<String> itemNames = new java.util.ArrayList<>();

        for (Map<String, Object> row : rows) {
            String name = (String) row.get("name");
            // Handle Numeric/Integer database conversions safely
            Number priceNum = (Number) row.get("price");
            int price = priceNum != null ? priceNum.intValue() : 0;

            totalAmount += price;
            itemNames.add(name + " (¥" + price + ")");
        }

        // 3. Print/Log the Mock Email safely to the console log context
        System.out.println("=========================================");
        System.out.println("SMTP EMULATION OUTBOUND DELIVERY");
        System.out.println("TO: " + userEmail);
        System.out.println("Subject: Rogermart Order Confirmation ##" + System.currentTimeMillis());
        System.out.println("-----------------------------------------");
        System.out.println("Dear " + userName + ",\n");
        System.out.println("Thank you for choosing Rogermart! Here is your purchase list:");
        for (String details : itemNames) {
            System.out.println("- " + details);
        }
        System.out.println("\nGRAND TOTAL CHARGED: ¥" + totalAmount);
        System.out.println("=========================================");

        // 4. Clean up / Empty the cart database entries using SQL
        String deleteSql = "DELETE FROM cart WHERE user_id = :userId";
        template.update(deleteSql, param);

        results.put("success", true);
        results.put("message", "Checkout successful! An order receipt summary has been dispatched to " + userEmail);
        return results;
    }
}
