package com.ieum.kr.dto;

import com.ieum.kr.entity.BookMarkEntity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookMarkDTO {
	
	private Integer seqNumber;
	private String userID;
	private String hsCode;
	private String productName;
	private float tax;
	private String country;
	private float tariff;
	private int price;
	private float quantity;
	private String calculation;
	private String chatGPTAnswer;
	
	public static BookMarkDTO fromEntity(BookMarkEntity bookEntity) {
		return BookMarkDTO.builder()
				.seqNumber(bookEntity.getSeqNumber())
				.userID(bookEntity.getUserID())
				.hsCode(bookEntity.getHsCode())
				.productName(bookEntity.getProductName())
				.tax(bookEntity.getTax())
				.country(bookEntity.getCountry())
				.tariff(bookEntity.getTariff())
				.price(bookEntity.getPrice())
				.quantity(bookEntity.getQuantity())
				.calculation(bookEntity.getCalculation())
				.chatGPTAnswer(bookEntity.getChatGPTAnswer())
				.build();
	}

    public BookMarkEntity toEntity() {
        return BookMarkEntity.builder()
                .userID(this.userID)
                .hsCode(this.hsCode)
                .productName(this.productName)
                .tax(this.tax)
                .country(this.country)
                .tariff(this.tariff)
                .price(this.price)
                .quantity(this.quantity)
                .calculation(this.calculation)
                .chatGPTAnswer(this.chatGPTAnswer)
                .build();
    }
	
}
