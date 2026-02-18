package com.cognicart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.modelmapper.ModelMapper;

@SpringBootApplication
public class CogniCartApplication {

    public static void main(String[] args) {
        SpringApplication.run(CogniCartApplication.class, args);
        System.out.println("\n🚀 CogniCart Backend is running on http://localhost:5454");
        System.out.println("📁 H2 Console available at: http://localhost:5454/h2-console");
        System.out.println("📚 API Documentation: http://localhost:5454/api");
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
