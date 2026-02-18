package com.cognicart.controller;

import com.cognicart.dto.request.CreateProductRequest;
import com.cognicart.dto.response.ApiResponse;
import com.cognicart.dto.response.ProductResponse;
import com.cognicart.entity.CatalogEntry;
import com.cognicart.service.CatalogService;
import com.cognicart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class SellerController {
    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private CatalogService catalogService;
    
    // Endpoint for seller to add product (matches frontend)
    @PostMapping("/products")
    public ResponseEntity<ProductResponse> addProduct(@RequestBody CreateProductRequest request) {
        try {
            ProductResponse product = productService.createProduct(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(product);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Engine2 catalog endpoint
    @PostMapping("/engine2/catalog")
    public ResponseEntity<ApiResponse> submitToCatalog(@RequestBody Map<String, Object> request) {
        try {
            String productId = (String) request.get("product_id");
            @SuppressWarnings("unchecked")
            Map<String, Object> catalogData = (Map<String, Object>) request.get("catalog_data");
            
            if (productId == null || catalogData == null) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("product_id and catalog_data are required"));
            }
            
            CatalogEntry entry = catalogService.saveToCatalog(productId, catalogData);
            return ResponseEntity.ok(ApiResponse.success(
                    "Product submitted to Engine 2 catalog successfully",
                    entry
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}
