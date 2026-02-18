package com.cognicart.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private String orderNumber;
    private List<OrderItemResponse> orderItems;
    private Double totalAmount;
    private Double deliveryFee;
    private String status;
    private String paymentMethod;
    private String paymentStatus;
    private String shippingFirstName;
    private String shippingLastName;
    private String shippingAddress;
    private String shippingCity;
    private String shippingPincode;
    private String shippingPhone;
    private LocalDateTime createdAt;
    private LocalDateTime deliveredAt;
}
