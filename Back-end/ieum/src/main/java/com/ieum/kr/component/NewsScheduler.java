package com.ieum.kr.component;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ieum.kr.entity.NewsEntity;
import com.ieum.kr.repository.NewsRepository;
import com.ieum.kr.service.NewsService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@Component
@RequiredArgsConstructor
public class NewsScheduler {

    private final NewsService service;
    private final NewsRepository newsRepository;

//    @Scheduled(cron = "0 * * * * *") // 매 1분마다 실행 (테스트용)
     @Scheduled(cron = "0 0 0 * * *") // 실제 운영 시 매일 자정에 실행
    public void fetchAndSaveNews() {
        System.out.println("🕛 Naver 뉴스 자동 수집 시작");

        // 🔁 기존 뉴스 삭제 (선택)
         service.newsDeleteAll();
         System.out.println("🗑️ 기존 데이터 삭제 완료");

        List<String> keywords = List.of("FTA", "관세");

        Flux.fromIterable(keywords)
            .flatMap(keyword -> service.search(keyword, 15, 1, "date")
                .doOnNext(response -> {
                    List<NewsEntity> entities = response.getItems().stream()
                        // ✅ 중복 검사: link가 DB에 존재하지 않을 때만 저장
                        .filter(item -> !newsRepository.existsByLink(item.getLink()))
                        .map(item -> NewsEntity.from(item, keyword))
                        .collect(Collectors.toList());

                    if (!entities.isEmpty()) {
                        newsRepository.saveAll(entities);
                        System.out.println("✅ [" + keyword + "] 저장 완료: " + entities.size() + "건");
                    } else {
                        System.out.println("📌 [" + keyword + "] 중복 뉴스만 존재 – 저장 안 함");
                    }
                })
                .doOnError(error ->
                    System.err.println("❌ [" + keyword + "] 에러: " + error.getMessage()))
            )
            .subscribe();
    }
}
