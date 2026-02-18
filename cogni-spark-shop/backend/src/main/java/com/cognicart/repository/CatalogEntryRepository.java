package com.cognicart.repository;

import com.cognicart.entity.CatalogEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CatalogEntryRepository extends JpaRepository<CatalogEntry, Long> {
    Optional<CatalogEntry> findByProductId(Long productId);
    List<CatalogEntry> findByStatus(String status);
}
