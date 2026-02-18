package com.cognicart.service;

import com.cognicart.entity.CatalogEntry;
import com.cognicart.entity.Product;
import com.cognicart.repository.CatalogEntryRepository;
import com.cognicart.repository.ProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class CatalogService {
    
    @Autowired
    private CatalogEntryRepository catalogEntryRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Transactional
    public CatalogEntry saveToCatalog(String productId, Map<String, Object> catalogData) {
        Product product = productRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        try {
            String catalogDataJson = objectMapper.writeValueAsString(catalogData);
            
            CatalogEntry entry = CatalogEntry.builder()
                    .product(product)
                    .catalogData(catalogDataJson)
                    .status("pending_engine2_processing")
                    .build();
            
            return catalogEntryRepository.save(entry);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save catalog data: " + e.getMessage());
        }
    }
    
    public List<CatalogEntry> getPendingCatalogEntries() {
        return catalogEntryRepository.findByStatus("pending_engine2_processing");
    }
    
    public CatalogEntry getCatalogEntryByProductId(Long productId) {
        return catalogEntryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Catalog entry not found"));
    }
    
    @Transactional
    public CatalogEntry updateCatalogStatus(Long entryId, String status) {
        CatalogEntry entry = catalogEntryRepository.findById(entryId)
                .orElseThrow(() -> new RuntimeException("Catalog entry not found"));
        
        entry.setStatus(status);
        return catalogEntryRepository.save(entry);
    }
}
