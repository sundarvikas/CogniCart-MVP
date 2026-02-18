package com.cognicart.service;

import com.cognicart.dto.response.ProductResponse;
import com.cognicart.entity.Product;
import com.cognicart.entity.User;
import com.cognicart.entity.Wishlist;
import com.cognicart.repository.ProductRepository;
import com.cognicart.repository.WishlistRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistService {
    
    @Autowired
    private WishlistRepository wishlistRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private ModelMapper modelMapper;
    
    public List<ProductResponse> getWishlist() {
        User user = authService.getCurrentUser();
        List<Wishlist> wishlistItems = wishlistRepository.findByUserId(user.getId());
        
        return wishlistItems.stream()
                .map(item -> modelMapper.map(item.getProduct(), ProductResponse.class))
                .collect(Collectors.toList());
    }
    
    @Transactional
    public ProductResponse addToWishlist(Long productId) {
        User user = authService.getCurrentUser();
        
        // Check if already in wishlist
        if (wishlistRepository.existsByUserIdAndProductId(user.getId(), productId)) {
            throw new RuntimeException("Product already in wishlist");
        }
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        Wishlist wishlistItem = Wishlist.builder()
                .user(user)
                .product(product)
                .build();
        
        wishlistRepository.save(wishlistItem);
        
        return modelMapper.map(product, ProductResponse.class);
    }
    
    @Transactional
    public void removeFromWishlist(Long productId) {
        User user = authService.getCurrentUser();
        
        if (!wishlistRepository.existsByUserIdAndProductId(user.getId(), productId)) {
            throw new RuntimeException("Product not in wishlist");
        }
        
        wishlistRepository.deleteByUserIdAndProductId(user.getId(), productId);
    }
    
    public boolean isInWishlist(Long productId) {
        User user = authService.getCurrentUser();
        return wishlistRepository.existsByUserIdAndProductId(user.getId(), productId);
    }
    
    @Transactional
    public void clearWishlist() {
        User user = authService.getCurrentUser();
        List<Wishlist> items = wishlistRepository.findByUserId(user.getId());
        wishlistRepository.deleteAll(items);
    }
}
