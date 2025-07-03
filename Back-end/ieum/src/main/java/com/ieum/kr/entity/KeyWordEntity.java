package com.ieum.kr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "user_id")
	private String userId;
	
	@Column(name = "hs_code")
	private String hsCode;
	
	@Column(name = "product_name")
	private String productName;
	
	@Column(name = "check_type")
	private String checkType;
	
	public KeyWordEntity(long id, String userId) {
		this.id = id;
		this.userId = userId;
	}
}
