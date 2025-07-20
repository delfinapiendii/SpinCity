package com.example.uade.tpo.demo.model;

import java.math.BigDecimal;
import java.util.Optional;

import lombok.Data;

@Data
public class ViniloUpdateDTO {
    private Optional<Integer> stock = Optional.empty();
    private Optional<Double> price = Optional.empty();
    private Optional<String> title = Optional.empty();
    private Optional<String> subtitle = Optional.empty();
    private Optional<String> genero = Optional.empty();
    private Optional<String> description = Optional.empty();
    

}