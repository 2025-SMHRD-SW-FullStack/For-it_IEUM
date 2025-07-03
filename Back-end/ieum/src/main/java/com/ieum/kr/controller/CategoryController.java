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
		KeywordAllDTO all = new KeywordAllDTO();
		if (authHeader != null) {
			String userId = userService.getUserInfo(authHeader);

			if (userId != null) {
				KeyWordDTO dto = new KeyWordDTO();
				dto.setUserId(userId);
				List<KeyWordDTO> userKeyword = cateService.userKeyWordList(dto);
				List<KeyWordDTO> keyDto = new ArrayList<KeyWordDTO>();

				for (KeyWordDTO userKeywordList : userKeyword) {
					keyDto.add(userKeywordList);

					all.setUserKeyword(keyDto);
				}
			}
		}
		List<CategoryDTO> result = cateService.keywordList();
		List<CategoryDTO> cateList = new ArrayList<CategoryDTO>();
		for (CategoryDTO cateDto : result) {
			cateList.add(cateDto);

			all.setKeywordAll(cateList);
		}
		System.out.println(all);

//		map.put(result, "keyword");

		return ResponseEntity.ok(all);
	}

	@PostMapping("/keyword/interest")
	public void keywordSave(@RequestHeader(value = "Authorization", required = false) String authHeader,KeyWordDTO dto) {

		System.out.println("[categorySave Controller 접근 확인]");
		if (authHeader != null) {
			String userId = userService.getUserInfo(authHeader);
			dto.setUserId(userId);
			cateService.keywordSave(dto);
		}
	}
	
	@PostMapping("/keyword/delete")
	public void KeywordDelete(@RequestHeader(value = "Authorization", required = false) String authHeader,KeyWordDTO dto) {
		if (authHeader != null) {
			String userId = userService.getUserInfo(authHeader);
			dto.setUserId(userId);
			cateService.keywordDelete(dto);
		}
	}
}
