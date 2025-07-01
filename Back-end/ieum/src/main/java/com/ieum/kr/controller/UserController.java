package com.ieum.kr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ieum.kr.component.JwtUtil;
import com.ieum.kr.dto.UserDTO;
import com.ieum.kr.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name="User",description="유저 정보")
@SecurityRequirement(name = "BearerAuth")
public class UserController {

    private final JwtUtil jwtUtil;

	@Autowired
	UserService userService;

    @PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserDTO dto) {
	    try {
	        System.out.println("[login 컨트롤러 확인]");
	        System.out.println(dto);

	        String token = userService.login(dto);
	        return ResponseEntity.ok(Map.of("token", token));  // 프론트에 JSON으로 응답

	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
	    }
	}
    
//    @Operation(summary = "유저 정보", security = @SecurityRequirement(name = "BearerAuth"))
    @PostMapping("/user-info")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String authHeader) {
        System.out.println("[getUserInfo 컨트롤러 접근]");
        System.out.println("Authorization Header: " + authHeader); // ✅ 헤더값 확인

        String token = authHeader.replace("Bearer ", "");
        System.out.println("Extracted Token: " + token); // ✅ Bearer 제거 후 토큰만

        if (jwtUtil.validateToken(token)) {
            String userId = jwtUtil.extractUserId(token);
            System.out.println("UserId from token: " + userId); // ✅ 최종 파싱된 userId
            return ResponseEntity.ok(Map.of("userId", userId));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("토큰이 유효하지 않음");
        }
    }
	
}
