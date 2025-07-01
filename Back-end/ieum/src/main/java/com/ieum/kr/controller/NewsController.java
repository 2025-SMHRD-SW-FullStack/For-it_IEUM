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
@RequestMapping("/api/news")
@Tag(name = "News", description="뉴스 출력")
public class NewsController {
	
	private final NewsService service;
	
//	@GetMapping
//    public Mono<NewsResponse> searchNews(
//            @RequestParam String query,
//            @RequestParam(defaultValue = "10") int display,
//            @RequestParam(defaultValue = "1") int start,
//            @RequestParam(defaultValue = "sim") String sort) {
//    	
//    	// 디버깅 확인 용
//    	System.out.println("[컨트롤러]");
//    	System.out.println("url 테스터");
//    	System.out.println(query);
//        return service.search(query, display, start, sort);
//	
//	}
	
	@GetMapping("/serch")
	public List<NewsDTO> newsSearch(){
		
		List<NewsDTO> list = service.newsSearch();
		System.out.println(list);
		return list;
	}
}