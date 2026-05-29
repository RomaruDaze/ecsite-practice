package com.example.repository;

import com.example.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
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
        String sql = "SELECT * FROM users ORDER BY id DESC";
        return template.query(sql, ROW_MAPPER);
    }

    public User findByEmailAndPassword(String email, String password) {
        String sql = "SELECT * FROM users WHERE email = :email AND password = :password";
        SqlParameterSource param = new MapSqlParameterSource().addValue("email", email).addValue("password",password);
        return template.queryForObject(sql, param, ROW_MAPPER);
    }

    public void registerUser(User user) {
        String sql = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
        SqlParameterSource param = new MapSqlParameterSource()
                .addValue("name", user.getName())
                .addValue("email", user.getEmail())
                .addValue("password", user.getPassword()); // Recommended in production: BCrypt.hashpw(...)
        template.update(sql, param);
    }
}
