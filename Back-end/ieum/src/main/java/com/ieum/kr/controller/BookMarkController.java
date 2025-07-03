package com.ieum.kr.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping("/list")
	@Operation(summary="북마크 목록")
	public ResponseEntity<List<BookMarkDTO>> getBookMarkList(@RequestBody BookMarkDTO dto){
		System.out.println(dto);
		List<BookMarkDTO> list = bookMarkService.bookMarkList(dto);
		return ResponseEntity.ok(list);
	}
	
	@PostMapping("/save")
	@Operation(summary="저장")
	public String saveBookMark(@RequestBody BookMarkDTO dto) {
		String msg = bookMarkService.saveBookMark(dto);
		return msg;
	}
	
	@PostMapping("/del")
	@Operation(summary="삭제")
	public String delBookMark(@RequestBody BookMarkDTO dto) {
		String result = bookMarkService.delBookMark(dto);
		return result;
	}
	
}
