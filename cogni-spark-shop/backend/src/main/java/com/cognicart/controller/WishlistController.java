package com.cognicart.controller;

import com.cognicart.dto.response.ApiResponse;
import com.cognicart.dto.response.ProductResponse;
import com.cognicart.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    
    @Autowired
    private WishlistService wishlistService;
    
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getWishlist() {
        List<ProductResponse> wishlist = wishlistService.getWishlist();
        return ResponseEntity.ok(wishlist);
    }
    
    @PostMapping("/{productId}")
    public ResponseEntity<ProductResponse> addToWishlist(@PathVariable Long productId) {
        try {
            ProductResponse product = wishlistService.addToWishlist(productId);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse> removeFromWishlist(@PathVariable Long productId) {
        try {
            wishlistService.removeFromWishlist(productId);
            return ResponseEntity.ok(ApiResponse.success("Removed from wishlist"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/check/{productId}")
    public ResponseEntity<Boolean> isInWishlist(@PathVariable Long productId) {
        boolean isInWishlist = wishlistService.isInWishlist(productId);
        return ResponseEntity.ok(isInWishlist);
    }
    
    @DeleteMapping
    public ResponseEntity<ApiResponse> clearWishlist() {
        wishlistService.clearWishlist();
        return ResponseEntity.ok(ApiResponse.success("Wishlist cleared successfully"));
    }
}
