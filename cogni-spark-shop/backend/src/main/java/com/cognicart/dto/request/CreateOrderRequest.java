package com.cognicart.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateOrderRequest {
    
    @NotBlank(message = "First name is required")
    private String shippingFirstName;
    
    @NotBlank(message = "Last name is required")
    private String shippingLastName;
    
    @NotBlank(message = "Address is required")
    private String shippingAddress;
    
    @NotBlank(message = "City is required")
    private String shippingCity;
    
    @NotBlank(message = "PIN code is required")
    private String shippingPincode;
    
    @NotBlank(message = "Phone is required")
    private String shippingPhone;
    
    @NotBlank(message = "Payment method is required")
    private String paymentMethod;
}
