package com.ieum.kr.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class BookMarkDTO {
	
	private int seqNumber;
	private String userID;
	private String hsCode;
	private String productName;
	private String tax;
	private String country;
	private float tariff;
	private int price;
	private float quantity;
	private String chatGPTAnswer;
	private LocalDate date;
	
}
