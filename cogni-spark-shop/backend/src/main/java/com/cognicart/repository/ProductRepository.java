package com.cognicart.repository;

import com.cognicart.entity.Product;
import com.cognicart.enums.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductId(String productId);
    List<Product> findByCategory(ProductCategory category);
    List<Product> findByInStockTrue();
    List<Product> findBySellerId(Long sellerId);
    
    @Query("SELECT p FROM Product p WHERE p.status = 'active' AND p.visibility = 'public'")
    List<Product> findAllActiveProducts();
    
    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.productTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(@Param("keyword") String keyword);
    
    @Query("SELECT p FROM Product p WHERE p.category = :category AND " +
           "p.price BETWEEN :minPrice AND :maxPrice AND " +
           "p.rating >= :minRating AND p.status = 'active'")
    List<Product> findByFilters(
        @Param("category") ProductCategory category,
        @Param("minPrice") Double minPrice,
        @Param("maxPrice") Double maxPrice,
        @Param("minRating") Double minRating
    );
}
