package com.ieum.kr.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@Configuration
@SecurityScheme(
	    name = "BearerAuth",            // 이 이름으로 컨트롤러에서 사용할 수 있음
	    type = SecuritySchemeType.HTTP,
	    scheme = "bearer",
	    bearerFormat = "JWT"
	)
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")  // 또는 "/**"로 전체 허용
	                .allowedOrigins("http://54.180.155.188:5173")  // React/Spring 사용하는 포트
//	                //.allowedOrigins("*")  // 모든 URL허용
//	                .allowedOriginPatterns("*")
	                .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")
	                .allowCredentials(true);

	    }
	
	
}
