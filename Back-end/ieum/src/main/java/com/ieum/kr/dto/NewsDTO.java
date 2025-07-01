package com.ieum.kr.dto;

import com.ieum.kr.entity.NewsEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewsDTO {

	private long  id;
	private String title;
	private String originalLink;
	private String link;
	private String description;
	private String pubDate;
	
	public static NewsDTO fromEntity(NewsEntity entity) {
		return NewsDTO.builder()
				.id(entity.getId())
				.title(entity.getTitle())
				.originalLink(entity.getOriginallink())
				.link(entity.getLink())
				.description(entity.getDescription())
				.pubDate(entity.getPubDate())
				.build();
		
	}
	
}
