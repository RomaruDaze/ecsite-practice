package com.example.repository;

import com.example.domain.Cart;
import com.example.domain.Item;
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
        System.out.println("RepositorySave");
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
}
