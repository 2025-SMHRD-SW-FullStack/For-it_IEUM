package com.ieum.kr.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="FAVORITE")
public class BookMarkEntity {

	@Id
	@Column(name="SEQ_NUMBER")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int seqNumber;
	
	@Column(name="USER_ID")
	private String userID;
	
	@Column(name="HS_CODE")
	private String hsCode;
	
	@Column(name="PRODUCT_NAME")
	private String productName;
	
	@Column(name="TAX")
	private String tax;
	
	@Column(name="COUNTRY")
	private String country;
	
	@Column(name="TARIFF")
	private float tariff;
	
	@Column(name="PRICE")
	private int price;
	
	@Column(name="QUANTITY")
	private float quantity;
	
	@Column(name="CHATGPT_ANSWER")
	private String chatGPTAnswer;
	
	@Column(name="DATE")
	private LocalDate date;
}
