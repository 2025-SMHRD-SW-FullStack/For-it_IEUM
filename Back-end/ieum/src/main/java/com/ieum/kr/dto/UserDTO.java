package com.ieum.kr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

	private String userId;
	private String password;
	private String phoneNumber;
	private String email;
	private String serviceCheck;
	
}
