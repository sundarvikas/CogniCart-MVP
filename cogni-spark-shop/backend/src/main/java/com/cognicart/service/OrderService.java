package com.cognicart.service;

import com.cognicart.dto.request.CreateOrderRequest;
import com.cognicart.dto.response.OrderItemResponse;
import com.cognicart.dto.response.OrderResponse;
import com.cognicart.dto.response.ProductResponse;
import com.cognicart.entity.*;
import com.cognicart.enums.OrderStatus;
import com.cognicart.repository.OrderItemRepository;
import com.cognicart.repository.OrderRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private CartService cartService;
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private ModelMapper modelMapper;
    
    public List<OrderResponse> getUserOrders() {
        User user = authService.getCurrentUser();
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return orders.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public OrderResponse getOrderById(Long orderId) {
        User user = authService.getCurrentUser();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        // Verify order belongs to user
        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to order");
        }
        
        return convertToResponse(order);
    }
    
    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        User user = authService.getCurrentUser();
        
        // Get cart
        var cartResponse = cartService.getCart();
        if (cartResponse.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        
        // Calculate totals
        Double totalAmount = cartResponse.getTotalPrice();
        Double deliveryFee = totalAmount > 999 ? 0.0 : 99.0;
        
        // Create order
        String orderNumber = "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        
        Order order = Order.builder()
                .orderNumber(orderNumber)
                .user(user)
                .totalAmount(totalAmount + deliveryFee)
                .deliveryFee(deliveryFee)
                .status(OrderStatus.PENDING)
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus("pending")
                .shippingFirstName(request.getShippingFirstName())
                .shippingLastName(request.getShippingLastName())
                .shippingAddress(request.getShippingAddress())
                .shippingCity(request.getShippingCity())
                .shippingPincode(request.getShippingPincode())
                .shippingPhone(request.getShippingPhone())
                .build();
        
        Order savedOrder = orderRepository.save(order);
        
        // Create order items from cart
        for (var cartItem : cartResponse.getItems()) {
            OrderItem orderItem = OrderItem.builder()
                    .order(savedOrder)
                    .product(modelMapper.map(cartItem.getProduct(), Product.class))
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getProduct().getPrice())
                    .subtotal(cartItem.getProduct().getPrice() * cartItem.getQuantity())
                    .build();
            
            orderItemRepository.save(orderItem);
            savedOrder.getOrderItems().add(orderItem);
        }
        
        // Clear cart
        cartService.clearCart();
        
        return convertToResponse(savedOrder);
    }
    
    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);
        
        return convertToResponse(updatedOrder);
    }
    
    private OrderResponse convertToResponse(Order order) {
        List<OrderItemResponse> items = order.getOrderItems().stream()
                .map(this::convertToOrderItemResponse)
                .collect(Collectors.toList());
        
        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .orderItems(items)
                .totalAmount(order.getTotalAmount())
                .deliveryFee(order.getDeliveryFee())
                .status(order.getStatus().name())
                .paymentMethod(order.getPaymentMethod())
                .paymentStatus(order.getPaymentStatus())
                .shippingFirstName(order.getShippingFirstName())
                .shippingLastName(order.getShippingLastName())
                .shippingAddress(order.getShippingAddress())
                .shippingCity(order.getShippingCity())
                .shippingPincode(order.getShippingPincode())
                .shippingPhone(order.getShippingPhone())
                .createdAt(order.getCreatedAt())
                .deliveredAt(order.getDeliveredAt())
                .build();
    }
    
    private OrderItemResponse convertToOrderItemResponse(OrderItem item) {
        ProductResponse productResponse = modelMapper.map(item.getProduct(), ProductResponse.class);
        
        return OrderItemResponse.builder()
                .id(item.getId())
                .product(productResponse)
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .subtotal(item.getSubtotal())
                .build();
    }
}
