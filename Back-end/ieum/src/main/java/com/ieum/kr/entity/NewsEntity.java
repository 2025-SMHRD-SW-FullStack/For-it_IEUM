package com.ieum.kr.entity;

import java.time.LocalDateTime;

import com.ieum.kr.dto.NewsResponse;
import com.ieum.kr.dto.NewsResponse.Item;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "NEWS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "original_link")
    private String originallink;

    @Column(unique = true)
    private String link;

    @Column(length = 1000)
    private String description;

    @Column(name = "pub_date")
    private String pubDate;

    @Column(name = "collected_at")
    private LocalDateTime collectedAt;  // ✅ 추가된 필드

    @Column
    private String keyword;

    public static NewsEntity from(Item item, String keyword) {
        return new NewsEntity(
            null,
            item.getTitle(),
            item.getOriginallink(),
            item.getLink(),
            item.getDescription(),
            item.getPubDate(),
            LocalDateTime.now(),   // collectedAt
            keyword
        );
    }
}

