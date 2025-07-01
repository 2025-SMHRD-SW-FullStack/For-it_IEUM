package com.ieum.kr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.ieum.kr.dto.NewsResponse;
import com.ieum.kr.repository.NewsRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class NewsService {
	
	private final WebClient naverWebClient;
	@Autowired
	private NewsRepository newsRepository;
	
    public Mono<NewsResponse> search(String query,
                                          int display,
                                          int start,
                                          String sort) {
    	System.out.println("[service 확인]");
    	
        return naverWebClient.get()
            .uri(uriBuilder -> uriBuilder
            		.path("/v1/search/news.json")
                    .queryParam("query", query)
                    .queryParam("display", display)
                    .queryParam("start", start)
                    .queryParam("sort", sort)   // sim | date
                    .build())
            .retrieve()
            .onStatus(HttpStatusCode::isError,
                    res -> res.bodyToMono(String.class)
                              .flatMap(body -> Mono.error(
                                  new RuntimeException("NAVER " + res.statusCode() + " : " + body))))
            .bodyToMono(NewsResponse.class);
    }
    
    public void newsDeleteAll() {
    	
    	newsRepository.deleteAll();
    	
    }
    
}

