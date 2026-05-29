package com.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply to all endpoints
                .allowedOrigins("http://localhost:5173") // Allow your frontend port
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Explicitly permit OPTIONS and POST
                .allowedHeaders("*") // Allow all headers (Content-Type, Authorization, etc.)
                .allowCredentials(true);
    }
}