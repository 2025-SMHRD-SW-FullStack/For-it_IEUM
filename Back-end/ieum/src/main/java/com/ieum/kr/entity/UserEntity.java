package com.ieum.kr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "USER")
public class UserEntity {

	@Id
	@Column(name = "user_id")
	private String userId;
	
	private String name;
	
	private String password;
	
	@Column(name = "phone_number")
	private String phoneNumber;
	
	private String email;

	@Column(name = "service_check")
	private String serviceCheck;
	
}
