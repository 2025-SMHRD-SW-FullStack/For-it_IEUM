package com.ieum.kr.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@ConfigurationProperties(prefix = "openai")
public class ChatGPTProperties {

	/** application.properties 의 openai.api-key 값 */
    private String apiKey;
}
