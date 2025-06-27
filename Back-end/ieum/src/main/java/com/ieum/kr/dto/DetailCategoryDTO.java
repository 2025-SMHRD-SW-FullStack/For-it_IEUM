package com.ieum.kr.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class DetailCategoryDTO {

	@JsonProperty("hs_code")
	private String hsCode;
	@JsonProperty("product_name")
	private String productName;
//	private List<DetailCategoryDTO> list;
	
}
