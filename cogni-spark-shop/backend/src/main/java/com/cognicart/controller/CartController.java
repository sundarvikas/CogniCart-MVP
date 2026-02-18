package com.cognicart.controller;

import com.cognicart.dto.request.AddToCartRequest;
import com.cognicart.dto.request.UpdateCartItemRequest;
import com.cognicart.dto.response.ApiResponse;
import com.cognicart.dto.response.CartResponse;
import com.cognicart.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @GetMapping
    public ResponseEntity<CartResponse> getCart() {
        CartResponse cart = cartService.getCart();
        return ResponseEntity.ok(cart);
    }
    
    @PostMapping
    public ResponseEntity<CartResponse> addToCart(@Valid @RequestBody AddToCartRequest request) {
        try {
            CartResponse cart = cartService.addToCart(request);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{productId}")
    public ResponseEntity<CartResponse> updateCartItem(
            @PathVariable Long productId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        try {
            CartResponse cart = cartService.updateCartItem(productId, request);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{productId}")
    public ResponseEntity<CartResponse> removeFromCart(@PathVariable Long productId) {
        try {
            CartResponse cart = cartService.removeFromCart(productId);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping
    public ResponseEntity<ApiResponse> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok(ApiResponse.success("Cart cleared successfully"));
    }
}
