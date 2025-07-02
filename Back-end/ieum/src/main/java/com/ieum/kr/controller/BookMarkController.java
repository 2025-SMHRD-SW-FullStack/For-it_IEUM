package com.ieum.kr.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ieum.kr.dto.BookMarkDTO;
import com.ieum.kr.service.BookMarkService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/bookmark")
@Tag(name="북마크")
public class BookMarkController {

	@Autowired
	BookMarkService bookMarkService;
	
	@PostMapping("/save")
	@Operation(summary="저장")
	public String saveBookMark(@RequestBody BookMarkDTO dto) {
		String msg = bookMarkService.saveBookMark(dto);
		return msg;
	}
	
}
