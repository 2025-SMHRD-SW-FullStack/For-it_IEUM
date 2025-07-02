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
//	        registry.addMapping("/ieum/**")  // 또는 "/**"로 전체 허용
//	                //.allowedOrigins("http://localhost:5173","http://192.168.219.65:5173")  // React/Spring 사용하는 포트
//	                //.allowedOrigins("*")  // 모든 URL허용
//	                .allowedOriginPatterns("*")
//	                .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")
//	                .allowCredentials(true);
	        registry.addMapping("/api/**")                          // "/ieum" 컨텍스트 이후의 경로
			        .allowedOrigins("http://localhost:5173","http://192.168.219.65:5173")        // Vite(React) 개발 서버 주소
			        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
			        .allowCredentials(true);
	        // Swagger/OpenAPI
	        registry.addMapping("/v3/api-docs/**")
	                .allowedOrigins("http://localhost:5173")
	                .allowedMethods("GET","POST")
	                .allowCredentials(false);
	        registry.addMapping("/swagger-ui/**")
	                .allowedOrigins("http://localhost:5173")
	                .allowedMethods("GET","POST")
	                .allowCredentials(false);
	    }
	
	
}
