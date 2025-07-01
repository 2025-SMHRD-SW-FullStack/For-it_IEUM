package com.ieum.kr.dto;

import com.ieum.kr.entity.KeyWordEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class KeyWordDTO {

	private String userId;
	private String hsCode;
	private String productName;
	
	public static KeyWordDTO fromEntity(KeyWordEntity entity) {
		
		return KeyWordDTO.builder()
				.userId(entity.getUserId())
				.hsCode(entity.getHsCode())
				.productName(entity.getProductName())
				.build();
	}
}
