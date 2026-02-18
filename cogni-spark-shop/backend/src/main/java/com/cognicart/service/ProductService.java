package com.cognicart.service;

import com.cognicart.dto.request.CreateProductRequest;
import com.cognicart.dto.response.ProductResponse;
import com.cognicart.entity.Product;
import com.cognicart.entity.User;
import com.cognicart.enums.ProductCategory;
import com.cognicart.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private ModelMapper modelMapper;
    
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAllActiveProducts().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return convertToResponse(product);
    }
    
    public ProductResponse getProductByProductId(String productId) {
        Product product = productRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with productId: " + productId));
        return convertToResponse(product);
    }
    
    public List<ProductResponse> getProductsByCategory(String category) {
        ProductCategory productCategory = ProductCategory.valueOf(category.toUpperCase());
        return productRepository.findByCategory(productCategory).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public List<ProductResponse> searchProducts(String keyword) {
        return productRepository.searchProducts(keyword).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public ProductResponse createProduct(CreateProductRequest request) {
        User seller = authService.getCurrentUser();
        
        // Generate product ID if not provided
        String productId = request.getProductId();
        if (productId == null || productId.isEmpty()) {
            productId = "prod_" + System.currentTimeMillis();
        }
        
        // Parse category
        ProductCategory category = parseCategory(request.getCategory());
        
        // Build product
        Product product = Product.builder()
                .productId(productId)
                .productTitle(request.getProductTitle())
                .category(category)
                .brand(request.getBrand())
                .price(request.getPrice())
                .color(request.getColor())
                .material(request.getMaterial())
                .imageUrl(request.getImageUrl())
                .description(request.getDescription())
                .slug(generateSlug(request.getProductTitle(), productId))
                .status("active")
                .visibility("public")
                .rating(0.0)
                .reviewsCount(0)
                .inStock(true)
                .batteryLife(request.getBatteryLife())
                .connectivity(request.getConnectivity())
                .warranty(request.getWarranty())
                .specifications(request.getSpecifications())
                .sizes(request.getSizes())
                .gender(request.getGender())
                .fitType(request.getFitType())
                .dimensions(request.getDimensions())
                .usage(request.getUsage())
                .weight(request.getWeight())
                .author(request.getAuthor())
                .publisher(request.getPublisher())
                .language(request.getLanguage())
                .bindingType(request.getBindingType())
                .isbn(request.getIsbn())
                .sellerSubmittedTitle(request.getSellerSubmittedTitle())
                .sellerSubmittedDescription(request.getSellerSubmittedDescription())
                .seller(seller)
                .build();
        
        Product savedProduct = productRepository.save(product);
        return convertToResponse(savedProduct);
    }
    
    @Transactional
    public ProductResponse updateProduct(Long id, CreateProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        // Update fields
        if (request.getProductTitle() != null) product.setProductTitle(request.getProductTitle());
        if (request.getCategory() != null) product.setCategory(parseCategory(request.getCategory()));
        if (request.getBrand() != null) product.setBrand(request.getBrand());
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        if (request.getColor() != null) product.setColor(request.getColor());
        if (request.getMaterial() != null) product.setMaterial(request.getMaterial());
        if (request.getImageUrl() != null) product.setImageUrl(request.getImageUrl());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        
        Product updatedProduct = productRepository.save(product);
        return convertToResponse(updatedProduct);
    }
    
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        product.setStatus("deleted");
        product.setVisibility("private");
        productRepository.save(product);
    }
    
    private ProductResponse convertToResponse(Product product) {
        return modelMapper.map(product, ProductResponse.class);
    }
    
    private ProductCategory parseCategory(String category) {
        if (category == null) return ProductCategory.ELECTRONICS;
        
        switch (category.toLowerCase()) {
            case "electronics":
                return ProductCategory.ELECTRONICS;
            case "fashion":
                return ProductCategory.FASHION;
            case "home & kitchen":
            case "home_kitchen":
                return ProductCategory.HOME_KITCHEN;
            case "sports & fitness":
            case "sports_fitness":
                return ProductCategory.SPORTS_FITNESS;
            case "books":
                return ProductCategory.BOOKS;
            default:
                return ProductCategory.ELECTRONICS;
        }
    }
    
    private String generateSlug(String title, String productId) {
        if (title == null) return productId;
        return title.toLowerCase().replaceAll("[^a-z0-9]+", "-") + "-" + productId;
    }
}
