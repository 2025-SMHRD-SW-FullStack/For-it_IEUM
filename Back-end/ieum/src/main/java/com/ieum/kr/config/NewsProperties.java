package com.ieum.kr.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties(prefix="naver")
@Getter @Setter
public class NewsProperties {

	private String clientId;
    private String clientSecret;
    private String newsUrl;
	
}
