package com.ieum.kr.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@EnableConfigurationProperties(NewsProperties.class)
public class NewsCluentConfig {

	@Autowired
	private final NewsProperties props;
	
	public NewsCluentConfig(NewsProperties props) {
		this.props = props;
	}
	
	@Bean
	public WebClient naverWebClient() {

        return WebClient.builder()
            .baseUrl(props.getNewsUrl())
            .defaultHeader("X-Naver-Client-Id", props.getClientId())
            .defaultHeader("X-Naver-Client-Secret", props.getClientSecret())
            .build();
    }
	
}


