package com.ieum.kr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ieum.kr.dto.CategoryDTO;
import com.ieum.kr.dto.KeyWordDTO;
import com.ieum.kr.dto.KeywordAllDTO;
import com.ieum.kr.entity.CategoryEntity;
import com.ieum.kr.entity.KeyWordEntity;
import com.ieum.kr.service.CategoryService;
import com.ieum.kr.service.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
//@RequestMapping("/keyword")
@Tag(name = "keyword", description = "키워드")
@SecurityRequirement(name = "BearerAuth")
public class CategoryController {

	@Autowired
	CategoryService cateService;

	@Autowired
	UserService userService;

	// 관심 키워드 출력
	@PostMapping("/keyword")
	public ResponseEntity<?> keywordList(@RequestHeader(value = "Authorization", required = false) String authHeader) {

		System.out.println("[categoryAll Controller 접근 확인]");
		KeyWordDTO uDto = new KeyWordDTO();
		CategoryDTO aDto = new CategoryDTO();
		if (authHeader != null) {
			String userId = userService.getUserInfo(authHeader);
			uDto.setUserId(userId);

//			if (userId != null) {
//				List<KeyWordDTO> userKeyword = cateService.userKeyWordList(dto);
//				List<KeyWordDTO> keyDto = new ArrayList<KeyWordDTO>();
//
//				for (KeyWordDTO userKeywordList : userKeyword) {
//					keyDto.add(userKeywordList);
//
//					all.setUserKeyword(keyDto);
//				}
//			}
		}
//		List<CategoryDTO> result = cateService.keywordList();
//		List<CategoryDTO> cateList = new ArrayList<CategoryDTO>();
//		for (CategoryDTO cateDto : result) {
//			cateList.add(cateDto);
//
//			all.setKeywordAll(cateList);
//		}
		
//		cateService.listMerge(uDto, aDto);

//		map.put(result, "keyword");
		KeywordAllDTO result = cateService.listMerge(uDto, aDto);
		
		System.out.println(result);
//		return ResponseEntity.ok(cateService.listMerge(uDto, aDto));
		return ResponseEntity.ok(result);
	}

	@PostMapping("/keyword/interest")
	public ResponseEntity<?> keywordSave(@RequestHeader(value = "Authorization", required = false) String authHeader,@RequestBody KeyWordDTO uDto) {

		System.out.println("[categorySave Controller 접근 확인]");
		System.out.println(uDto);
		
		CategoryDTO aDto = new CategoryDTO();
		
		if (authHeader != null) {
			String userId = userService.getUserInfo(authHeader);
			uDto.setUserId(userId);
			// 회원의 카테고리 정보가 5보다 작을때만 카테고리 저장
			if(cateService.listMerge(uDto, aDto).getUserKeyword().size() <5) {
				cateService.keywordSave(uDto);
			}
		}
		
		return ResponseEntity.ok(cateService.listMerge(uDto, aDto));
	}
	
	@PostMapping("/keyword/delete")
	public ResponseEntity<?> KeywordDelete(@RequestHeader(value = "Authorization", required = false) String authHeader,KeyWordDTO uDto) {
		CategoryDTO aDto = new CategoryDTO();
		if (authHeader != null) {
			String userId = userService.getUserInfo(authHeader);
			uDto.setUserId(userId);
			cateService.keywordDelete(uDto);
		}
		return ResponseEntity.ok(cateService.listMerge(uDto, aDto));
	}
}
