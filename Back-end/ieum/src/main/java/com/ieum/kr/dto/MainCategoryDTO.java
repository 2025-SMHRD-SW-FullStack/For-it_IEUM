package com.ieum.kr.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class MainCategoryDTO {

	@JsonProperty("hs_code")
	private String hsCode;
	@JsonProperty("product_name")
	private String productName;
}
