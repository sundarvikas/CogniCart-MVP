package com.cognicart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "catalog_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CatalogEntry {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(length = 5000)
    private String catalogData; // JSON string
    
    private String status = "pending_engine2_processing";
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime processedAt;
}
