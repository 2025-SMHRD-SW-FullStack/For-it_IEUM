package com.ieum.kr.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class TariffInfoDTO {

	@JsonProperty("hs_code")
	private String hsCode;
	@JsonProperty("product_name")
	private String productName;
	@JsonProperty("base_tariff")
	private float baseTariff;
	@JsonProperty("top10_data")
	private List<TariffList> list;
	
	@Data
	public static class TariffList{
		private String name;
		private float rate;
	}
	
}

