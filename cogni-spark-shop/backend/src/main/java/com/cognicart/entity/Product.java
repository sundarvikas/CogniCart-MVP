package com.cognicart.entity;

import com.cognicart.enums.ProductCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String productId; // e.g., prod_1234567890
    
    @Column(nullable = false)
    private String productTitle;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductCategory category;
    
    private String brand;
    private Double price;
    private String color;
    private String material;
    private String imageUrl;
    
    @Column(length = 2000)
    private String description;
    
    private String slug;
    private String status = "active";
    private String visibility = "public";
    
    private Double rating = 0.0;
    private Integer reviewsCount = 0;
    private Boolean inStock = true;
    private String badge;
    
    // Electronics specific
    private String batteryLife;
    private String connectivity;
    private String warranty;
    
    @Column(length = 1000)
    private String specifications; // JSON string
    
    // Fashion specific
    private String sizes; // JSON array as string
    private String gender;
    private String fitType;
    
    // Home & Kitchen specific
    private String dimensions;
    private String usage;
    
    // Sports & Fitness specific
    private String weight;
    
    // Books specific
    private String author;
    private String publisher;
    private String language;
    private String bindingType;
    private String isbn;
    
    // Seller information
    @Column(length = 500)
    private String sellerSubmittedTitle;
    
    @Column(length = 2000)
    private String sellerSubmittedDescription;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
