package com.example.uade.tpo.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.uade.tpo.demo.repository.CuentaRepository;

@RestController
@RequestMapping("/api/ping")
public class PingController {

    @Autowired
    private CuentaRepository cuentaRepository;

    @GetMapping
    public ResponseEntity<String> ping() {
        try {
            long count = cuentaRepository.count(); // solo cuenta filas
            return ResponseEntity.ok("Conectado a Neon! Cantidad de cuentas: " + count);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error de conexión: " + e.getMessage());
        }
    }
}
