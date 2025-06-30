package com.ieum.kr.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class ProductDTO {

	@JsonProperty("hs_code")
	private String hsCode;
	@JsonProperty("product_name")
	private String productName;
	
}
