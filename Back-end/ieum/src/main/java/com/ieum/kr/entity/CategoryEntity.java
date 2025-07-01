package com.ieum.kr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MAIN_CATEGORY")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity {

	@Id
	@Column(name = "hs_code")
	private String hsCode;
	
	@Column(name = "product_name")
	private String productName;
	
}
