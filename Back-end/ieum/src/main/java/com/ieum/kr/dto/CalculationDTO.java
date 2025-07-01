package com.ieum.kr.dto;

import lombok.Data;

@Data
public class CalculationDTO {

	private int price;
	private int quantity;
	private float tax;
	private String country;
	private float tariff;
	private String calculation;
	
}
