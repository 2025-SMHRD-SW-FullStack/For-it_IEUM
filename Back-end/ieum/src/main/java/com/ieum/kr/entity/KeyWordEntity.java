package com.ieum.kr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "KEY_WORD")
public class KeyWordEntity {

	@Id
	@Column(name = "user_id")
	private String userId;
	
	@Column(name = "hs_code")
	private String hsCode;
	
	@Column(name = "product_name")
	private String productName;
	
}
