package com.cognicart.service;

import com.cognicart.dto.request.AddToCartRequest;
import com.cognicart.dto.request.UpdateCartItemRequest;
import com.cognicart.dto.response.CartItemResponse;
import com.cognicart.dto.response.CartResponse;
import com.cognicart.dto.response.ProductResponse;
import com.cognicart.entity.Cart;
import com.cognicart.entity.CartItem;
import com.cognicart.entity.Product;
import com.cognicart.entity.User;
import com.cognicart.repository.CartItemRepository;
import com.cognicart.repository.CartRepository;
import com.cognicart.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private ModelMapper modelMapper;
    
    public CartResponse getCart() {
        User user = authService.getCurrentUser();
        Cart cart = getOrCreateCart(user);
        return convertToResponse(cart);
    }
    
    @Transactional
    public CartResponse addToCart(AddToCartRequest request) {
        User user = authService.getCurrentUser();
        Cart cart = getOrCreateCart(user);
        
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        // Check if product already in cart
        CartItem existingItem = cartItemRepository
                .findByCartIdAndProductId(cart.getId(), product.getId())
                .orElse(null);
        
        if (existingItem != null) {
            // Update quantity
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
            cartItemRepository.save(existingItem);
        } else {
            // Add new item
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .build();
            cartItemRepository.save(newItem);
            cart.getItems().add(newItem);
        }
        
        return convertToResponse(cart);
    }
    
    @Transactional
    public CartResponse updateCartItem(Long productId, UpdateCartItemRequest request) {
        User user = authService.getCurrentUser();
        Cart cart = getOrCreateCart(user);
        
        CartItem cartItem = cartItemRepository
                .findByCartIdAndProductId(cart.getId(), productId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        cartItem.setQuantity(request.getQuantity());
        cartItemRepository.save(cartItem);
        
        return convertToResponse(cart);
    }
    
    @Transactional
    public CartResponse removeFromCart(Long productId) {
        User user = authService.getCurrentUser();
        Cart cart = getOrCreateCart(user);
        
        cartItemRepository.deleteByCartIdAndProductId(cart.getId(), productId);
        
        // Refresh cart
        cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        
        return convertToResponse(cart);
    }
    
    @Transactional
    public void clearCart() {
        User user = authService.getCurrentUser();
        Cart cart = getOrCreateCart(user);
        
        cart.getItems().clear();
        cartRepository.save(cart);
    }
    
    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .user(user)
                            .build();
                    return cartRepository.save(newCart);
                });
    }
    
    private CartResponse convertToResponse(Cart cart) {
        List<CartItemResponse> items = cart.getItems().stream()
                .map(this::convertToCartItemResponse)
                .collect(Collectors.toList());
        
        return CartResponse.builder()
                .id(cart.getId())
                .items(items)
                .totalPrice(cart.getTotalPrice())
                .totalItems(cart.getTotalItems())
                .build();
    }
    
    private CartItemResponse convertToCartItemResponse(CartItem item) {
        ProductResponse productResponse = modelMapper.map(item.getProduct(), ProductResponse.class);
        
        return CartItemResponse.builder()
                .id(item.getId())
                .product(productResponse)
                .quantity(item.getQuantity())
                .build();
    }
}
