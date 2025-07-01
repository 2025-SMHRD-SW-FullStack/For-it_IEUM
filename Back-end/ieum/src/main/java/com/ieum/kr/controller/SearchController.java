package com.ieum.kr.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ieum.kr.dto.RankProjection;
import com.ieum.kr.dto.SearchDTO;
import com.ieum.kr.service.SearchService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name="Search",description="검색 관련 API")
public class SearchController {

	@Autowired
	SearchService searchService;

	@GetMapping("/rank")
	public ResponseEntity<List<RankProjection>> getTopRank() {
		List<RankProjection> rankList = searchService.searchTopRank();
		return ResponseEntity.ok(rankList);
	}
	
	@PostMapping("/search")
	public ResponseEntity<?> goSearch(@ModelAttribute SearchDTO dto) {
		System.out.println(dto.getChoise());
		System.out.println(dto.getKeyword());
		List<?> result;
		if("productName".equals(dto.getChoise())) {
			if (dto.getKeyword().matches("\\d+")) {
				return ResponseEntity
						.badRequest()
						.body(Map.of("error", "문자를 입력해주세요."));
			}
			result = searchService.searchProductName(dto.getKeyword());
			return ResponseEntity.ok(result);
		}else {
			if (!dto.getKeyword().matches("\\d+")) {
				return ResponseEntity
						.badRequest()
						.body(Map.of("error", "HS 코드는 숫자만 입력 가능합니다."));
			}
			int len = dto.getKeyword().length();
			int hsCode;
			if(len < 4) {
				result = searchService.searchMainCategory(dto.getKeyword());
			}else if(len == 4) {
				result = searchService.searchDetailCategory(dto.getKeyword());
			}else {
				result = searchService.searchLowTariff(dto.getKeyword());
			}
		}
		return ResponseEntity.ok(result);
	}
	
}
