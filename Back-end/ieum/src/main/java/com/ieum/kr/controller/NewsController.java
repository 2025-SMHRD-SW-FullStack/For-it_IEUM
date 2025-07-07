package com.ieum.kr.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ieum.kr.dto.NewsDTO;
import com.ieum.kr.dto.NewsResponse;
import com.ieum.kr.entity.NewsEntity;
import com.ieum.kr.service.NewsService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
//@RequestMapping("/news")
@Tag(name = "News", description="뉴스 출력")
public class NewsController {
	
	private final NewsService service;
	
	@GetMapping("/news")
	public List<NewsDTO> newsSearch(){
		
		List<NewsDTO> list = service.newsSearch();
		return list;
	}
}