package com.cognicart.dto.request;

import lombok.Data;

@Data
public class CreateProductRequest {
    private String productId;
    private String productTitle;
    private String category;
    private String brand;
    private Double price;
    private String color;
    private String material;
    private String imageUrl;
    private String description;
    
    // Electronics specific
    private String batteryLife;
    private String connectivity;
    private String warranty;
    private String specifications;
    
    // Fashion specific
    private String sizes;
    private String gender;
    private String fitType;
    
    // Home & Kitchen / Sports specific
    private String dimensions;
    private String usage;
    private String weight;
    
    // Books specific
    private String author;
    private String publisher;
    private String language;
    private String bindingType;
    private String isbn;
    
    // Seller information
    private String sellerSubmittedTitle;
    private String sellerSubmittedDescription;
}
