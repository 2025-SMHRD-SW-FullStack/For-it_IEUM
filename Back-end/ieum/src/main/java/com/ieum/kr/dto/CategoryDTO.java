package com.ieum.kr.dto;

import com.ieum.kr.entity.CategoryEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDTO {

	private String hsCode;
	private String productName;
	private String checkType;
	
	public static CategoryDTO fromEntity(CategoryEntity categoryEntity) {
		return CategoryDTO.builder()
				.hsCode(categoryEntity.getHsCode())
				.productName(categoryEntity.getProductName())
				.checkType(categoryEntity.getCheckType())
				.build();
		
	}
	
}
