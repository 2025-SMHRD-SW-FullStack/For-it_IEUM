package com.ieum.kr.dto;

import java.util.List;

import lombok.Data;

@Data
public class NewsResponse {

	private String lastBuildDate;
    private int total;
    private int start;
    private int display;
    private List<Item> items;
    
    @Data
    public static class Item {
        private String title;
        private String originallink;
        private String link;
        private String description;
        private String pubDate;
    }
}
