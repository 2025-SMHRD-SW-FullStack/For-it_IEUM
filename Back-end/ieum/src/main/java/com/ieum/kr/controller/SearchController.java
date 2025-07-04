package com.ieum.kr.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ieum.kr.dto.CalculationDTO;
import com.ieum.kr.dto.RankDTO;
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
	@Operation(summary="랭킹")
	public ResponseEntity<List<RankProjection>> getTopRank() {
		List<RankProjection> rankList = searchService.searchTopRank();
		return ResponseEntity.ok(rankList);
	}
	
	@PostMapping("/search")
	@Operation(summary="검색")
	public ResponseEntity<?> goSearch(@RequestBody SearchDTO dto) {
		List<?> result;
		System.out.println("searchController");
		System.out.println(dto);
		if("productName".equals(dto.getChoice())) {
			if (dto.getInput().matches("\\d+")) {
				return ResponseEntity
						.badRequest()
						.body(Map.of("error", "문자를 입력해주세요."));
			}
			result = searchService.searchProductName(dto.getInput());
			return ResponseEntity.ok(result);
		}else {
			if (!dto.getInput().matches("\\d+")) {
				return ResponseEntity
						.badRequest()
						.body(Map.of("error", "HS 코드는 숫자만 입력 가능합니다."));
			}

			result = searchService.searchProduct(dto.getInput());
		}
		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/cal")
	@Operation(summary="계산")
	public CalculationDTO goCalculation(@RequestBody CalculationDTO dto) {
		CalculationDTO result = searchService.useCalcul(dto);
		return result;
	}
	
	@PostMapping("/save")
	@Operation(summary="저장")
	public void saveSearchData(@RequestBody RankDTO dto) {
		searchService.saveSearchData(dto);
	}
	
}
