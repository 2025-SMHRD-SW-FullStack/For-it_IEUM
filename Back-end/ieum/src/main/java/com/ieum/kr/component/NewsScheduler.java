package com.ieum.kr.component;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ieum.kr.entity.NewsEntity;
import com.ieum.kr.repository.NewsRepository;
import com.ieum.kr.service.NewsService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NewsScheduler {

    private final NewsService service;
    private final NewsRepository newsRepository; // DB 저장용

//    @Scheduled(cron = "0 * * * * *") // 1분 마다 실행
    @Scheduled(cron = "0 0 0 * * *") // 매일 0시 (한국시간 기준) 
    public void fetchAndSaveNews() {
        System.out.println("🕛 Naver 뉴스 자동 수집 시작");
        
        System.out.println(service.search("FTA", 10, 1, "date").toString());
        	service.newsDeleteAll();
//        if(service.search("FTA", 10, 1, "date") != null) {
//        	System.out.println("데이터 삭제");
//        }
        System.out.println("데이터 삭제");
        
        service.search("FTA", 10, 1, "date")
            .doOnNext(response -> {
                List<NewsEntity> entities = response.getItems().stream()
                    .map(item -> NewsEntity.from(item))
                    .collect(Collectors.toList());
                newsRepository.saveAll(entities);
                System.out.println("✅ 저장 완료: " + entities.size() + "건");
            })
            .doOnError(error -> System.err.println("❌ 에러 발생: " + error.getMessage()))
            .subscribe(); // Mono 구독 필요
    }
}
