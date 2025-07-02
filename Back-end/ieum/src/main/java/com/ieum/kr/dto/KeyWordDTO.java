package com.ieum.kr.dto;

import java.util.Optional;

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

	private long id;
	private String userId;
	private String hsCode;
	private String productName;
	
	public static KeyWordDTO fromEntity(KeyWordEntity keyWordEntity) {
		
		return KeyWordDTO.builder()
				.id(keyWordEntity.getId())
				.userId(keyWordEntity.getUserId())
				.hsCode(keyWordEntity.getHsCode())
				.productName(keyWordEntity.getProductName())
				.build();
	}
}
