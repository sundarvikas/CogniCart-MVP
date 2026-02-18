package com.cognicart.service;

import com.cognicart.dto.request.SignInRequest;
import com.cognicart.dto.request.SignUpRequest;
import com.cognicart.dto.response.AuthResponse;
import com.cognicart.entity.Cart;
import com.cognicart.entity.User;
import com.cognicart.enums.UserRole;
import com.cognicart.repository.CartRepository;
import com.cognicart.repository.UserRepository;
import com.cognicart.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @Transactional
    public AuthResponse signUp(SignUpRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        
        // Create new user
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(UserRole.CUSTOMER)
                .active(true)
                .build();
        
        User savedUser = userRepository.save(user);
        
        // Create cart for user
        Cart cart = Cart.builder()
                .user(savedUser)
                .build();
        cartRepository.save(cart);
        
        // Generate JWT token
        String jwt = jwtTokenProvider.generateTokenFromEmail(savedUser.getEmail());
        
        return AuthResponse.builder()
                .jwt(jwt)
                .message("User registered successfully")
                .email(savedUser.getEmail())
                .role(savedUser.getRole().name())
                .build();
    }
    
    public AuthResponse signIn(SignInRequest request) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Generate JWT token
        String jwt = jwtTokenProvider.generateToken(authentication);
        
        // Get user details
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return AuthResponse.builder()
                .jwt(jwt)
                .message("Login successful")
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
    
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
