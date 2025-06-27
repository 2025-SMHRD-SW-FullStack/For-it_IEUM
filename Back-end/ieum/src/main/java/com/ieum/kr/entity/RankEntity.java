package com.ieum.kr.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="search_list")
public class RankEntity {

	@Id
	@Column(name="hs_code")
	private String hsCode;
	@Column(name="product_name")
	private String productName;
	@Column(name="`date`")
	private LocalDate date;
	
    protected RankEntity() {}
    public RankEntity(String hsCode, String productName, LocalDate date) {
        this.hsCode = hsCode;
        this.productName = productName;
        this.date = date;
    }
}
