package com.example.repository;

import com.example.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    @Autowired
    private NamedParameterJdbcTemplate template;

    private static final RowMapper<User> ROW_MAPPER = (rs, i) -> {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        return user;
    };

    public List<User> fetchAllUsers() {
        System.out.println("RepositoryFindAll");
        String sql = "SELECT * FROM users ORDER BY id DESC";
        return template.query(sql, ROW_MAPPER);
    }
}
