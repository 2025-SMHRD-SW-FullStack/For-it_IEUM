package com.ieum.kr.entity;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="FAVORITE")
@Builder
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
	private float tax;
	
	@Column(name="COUNTRY")
	private String country;
	
	@Column(name="TARIFF")
	private float tariff;
	
	@Column(name="PRICE")
	private int price;
	
	@Column(name="QUANTITY")
	private float quantity;
	
	@Column(name="CALCULATION")
	private String calculation;
	
	@Column(name="CHATGPT_ANSWER")
	private String chatGPTAnswer;
	
    @Column(name="DATE", nullable=false)
    private LocalDateTime date;

    @PrePersist
    public void onCreate() {
        this.date = ZonedDateTime
                        .now(ZoneId.of("Asia/Seoul"))
                        .toLocalDateTime();
    }

    @PreUpdate
    public void onUpdate() {
        this.date = ZonedDateTime
                        .now(ZoneId.of("Asia/Seoul"))
                        .toLocalDateTime();
    }
	
	
}
