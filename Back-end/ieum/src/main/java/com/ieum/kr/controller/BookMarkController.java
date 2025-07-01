package com.ieum.kr.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ieum.kr.dto.BookMarkDTO;

@RestController
@RequestMapping("/bookmark")
public class BookMarkController {

	@PostMapping("/save")
	public void saveBookMark(BookMarkDTO dto) {
		
	}
	
}
