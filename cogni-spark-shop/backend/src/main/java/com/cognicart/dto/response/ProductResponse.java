package com.cognicart.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String productId;
    private String productTitle;
    private String category;
    private String brand;
    private Double price;
    private String color;
    private String material;
    private String imageUrl;
    private String description;
    private String slug;
    private String status;
    private Double rating;
    private Integer reviewsCount;
    private Boolean inStock;
    private String badge;
    
    // Category-specific fields
    private String batteryLife;
    private String connectivity;
    private String warranty;
    private String specifications;
    private String sizes;
    private String gender;
    private String fitType;
    private String dimensions;
    private String usage;
    private String weight;
    private String author;
    private String publisher;
    private String language;
    private String bindingType;
    private String isbn;
    
    private LocalDateTime createdAt;
}
