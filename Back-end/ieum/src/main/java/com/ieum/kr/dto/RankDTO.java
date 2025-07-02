package com.ieum.kr.dto;

import java.time.LocalDate;

import com.ieum.kr.entity.RankEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RankDTO {

	private String hsCode;
	private String productName;
	private LocalDate date;
	
    public RankEntity toEntity() {
        return RankEntity.builder()
                .hsCode(this.hsCode)
                .productName(this.productName)
                .date(this.date)
                .build();
    }
}
