package com.ieum.kr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ieum.kr.dto.CategoryDTO;
import com.ieum.kr.dto.KeyWordDTO;
import com.ieum.kr.entity.CategoryEntity;
import com.ieum.kr.service.CategoryService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/cate")
@Tag(name="categori",description="카테고리_키워드")
public class CategoryController {
	
	@Autowired
	CategoryService cateService;
	
	@PostMapping("/")
	public ResponseEntity<?> categoryAll(@ModelAttribute KeyWordDTO keyWordDTO) {
		
		System.out.println("[categoryAll Controller 접근 확인]");
		System.out.println(keyWordDTO.getUserId());
		
//		if(keyWordDTO.getUserId() != null) {
////			List<KeyWordDTO> userKeyWord = cateService
//		}
		
		
		List<CategoryDTO> result = cateService.CategoryAllList();
		System.out.println(result);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/save")
	public void categorySave(@ModelAttribute CategoryDTO cateDto) {
		
		System.out.println("[categorySave Controller 접근 확인]");
		
		
		
	}
}
