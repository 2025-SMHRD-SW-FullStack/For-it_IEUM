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

	private String userId;
	private String hsCode;
	private String productName;
	
	public static KeyWordDTO fromEntity(Optional<KeyWordEntity> optional) {
		
		return KeyWordDTO.builder()
				.userId(optional.get().getUserId())
				.hsCode(optional.get().getHsCode())
				.productName(optional.get().getProductName())
				.build();
	}
}
