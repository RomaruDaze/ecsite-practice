package com.example.service;

import com.example.domain.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> fetchAllUsers() {
        return userRepository.fetchAllUsers();
    }

//    public  findById(Integer id) {
//        return .findById(id);
//    }

//    public  save( ) {
//        return .save();
//    }
//
//    public void deleteById(Integer id) {
//        .deleteById(id);
//    }
//
//    public  update( ) {
//        return .save();
//    }
}
