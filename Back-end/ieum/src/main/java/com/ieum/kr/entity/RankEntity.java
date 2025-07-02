package com.ieum.kr.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

@Data
@Entity
@Builder
@Table(name="SEARCH_LIST")
public class RankEntity {

	@Id
	@Column(name="HS_CODE")
	private String hsCode;
	@Column(name="PRODUCT_NAME")
	private String productName;
	@Column(name="DATE")
	private LocalDate date;
	
    protected RankEntity() {}
    public RankEntity(String hsCode, String productName, LocalDate date) {
        this.hsCode = hsCode;
        this.productName = productName;
        this.date = date;
    }
}
