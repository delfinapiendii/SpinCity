package com.example.uade.tpo.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.uade.tpo.demo.entity.Factura;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long>{
     Optional<Factura> findById(Long id);
}
