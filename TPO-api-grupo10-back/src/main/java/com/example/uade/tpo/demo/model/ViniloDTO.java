package com.example.uade.tpo.demo.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

import com.example.uade.tpo.demo.service.ViniloServiceImpl;

@Data
@Embeddable
public class ViniloDTO {
	
	private Long viniloId;
	private String title;
	private String subtitle;
	private byte[] image;
	private double precio;
	private String genero;
    private int cantidad = 1;
    
	public ViniloDTO(){}
	public ViniloDTO(Long viniloId, String title, String subtitle, double precio, String genero, int cantidad) {
		this.viniloId = viniloId;
		this.title = title;
		this.subtitle = subtitle;
		this.image = image;
		this.precio = precio;
		this.genero = genero;
		this.cantidad = cantidad;
	}
	
	
}

