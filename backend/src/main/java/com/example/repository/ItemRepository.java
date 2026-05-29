package com.example.repository;

import com.example.domain.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ItemRepository {
    @Autowired
    private NamedParameterJdbcTemplate template;

    private static final RowMapper<Item> ROW_MAPPER = (rs, i) -> {
        Item item = new Item();
        item.setId(rs.getInt("id"));
        item.setName(rs.getString("name"));
        item.setPrice(rs.getInt("price"));
        item.setImageUrl(rs.getString("image_url"));
        item.setDescription(rs.getString("description"));
        return item;
    };

    public List<Item> fetchAllItems() {
        String sql = "SELECT * FROM items ORDER BY price DESC";
        return template.query(sql, ROW_MAPPER);
    }

    public Item fetchItemById(Integer id) {
        System.out.println("RepositoryFindById");
        String sql = "SELECT * FROM items WHERE id = :id";
        SqlParameterSource param = new MapSqlParameterSource().addValue("id", id);
        return template.queryForObject(sql, param, ROW_MAPPER);
    }

    public List<Item> fetchItemByName(String word) {
        System.out.println("RepositoryFindById");
        String sql = "SELECT * FROM items WHERE name LIKE :word";
        SqlParameterSource param = new MapSqlParameterSource().addValue("word", "%" + word + "%");
        return template.query(sql, param, ROW_MAPPER);
    }


    public List<Item> fetchCartAllItem(Integer userId) {
        String sql =
                "SELECT id, name, price,description,image_url \n" +
                "FROM items AS i\n" +
                "WHERE i.id IN (\n" +
                "    SELECT c.item_id \n" +
                "    FROM cart AS c \n" +
                "    JOIN users AS u ON u.id = c.user_id\n" +
                "    where u.id = :id\n" +
                "    )\n" +
                ";";
        SqlParameterSource param = new MapSqlParameterSource().addValue("id", userId);
        return template.query(sql, param, ROW_MAPPER);
    }
}
