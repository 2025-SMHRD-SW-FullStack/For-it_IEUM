package com.ieum.kr.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KeywordAllDTO {

	
	private List<KeyWordDTO> userKeyword;
	private List<CategoryDTO> keywordAll;
	
}
