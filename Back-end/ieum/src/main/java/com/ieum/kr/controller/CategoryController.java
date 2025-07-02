package com.ieum.kr.controller;

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
import com.ieum.kr.entity.CategoryEntity;
import com.ieum.kr.service.CategoryService;
import com.ieum.kr.service.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
//@RequestMapping("/keyword")
@Tag(name="keyword",description="키워드")
@SecurityRequirement(name = "BearerAuth")
public class CategoryController {
	
	@Autowired
	CategoryService cateService;
	
	@Autowired
	UserService userService;
	
	@PostMapping("/keyword")
	public ResponseEntity<?> keywordList(@RequestHeader(value = "Authorization", required = false) String authHeader) {
		
		System.out.println("[categoryAll Controller 접근 확인]");
//		System.out.println(keyWordDTO.getUserId());
		
//		if(keyWordDTO.getUserId() != null) {
//			List<KeyWordDTO> userKeyWord = cateService
//		}
		
		String userId = userService.getUserInfo(authHeader);
		
		if(userId != null) {
			
		}
		
		List<CategoryDTO> result = cateService.keywordList();
		System.out.println(result);
		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/keyword/interest")
	public void categorySave(@RequestHeader(value = "Authorization", required = false) String authHeader) {
		
		System.out.println("[categorySave Controller 접근 확인]");
		
		
		
	}
}
