package com.ieum.kr.entity;

import com.ieum.kr.dto.NewsResponse;

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
@Table(name = "news")
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
    private String link;
    @Column(length = 1000)
    private String description;
    @Column(name = "pub_date")
    private String pubDate;

    public static NewsEntity from(NewsResponse.Item item) {
        return new NewsEntity(null, item.getTitle(), item.getOriginallink(),
                item.getLink(), item.getDescription(), item.getPubDate());
    }
}
