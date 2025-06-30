package com.ieum.kr.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;

@Configuration
@EnableConfigurationProperties(ChatGPTProperties.class)
public class ChatGPTClientConfig {

    @Bean
    public OpenAIClient openAIClient(ChatGPTProperties props) {
        if (props.getApiKey() == null) {
            throw new IllegalStateException("OPENAI_API_KEY 누락!");
        }
        return OpenAIOkHttpClient.builder()
                                 .apiKey(props.getApiKey())
                                 .build();
	
    }
}