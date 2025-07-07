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
import com.ieum.kr.dto.LoginDTO;
import com.ieum.kr.dto.UserDTO;
import com.ieum.kr.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
//@RequestMapping("/api")
@Tag(name="User",description="유저 정보")
@SecurityRequirement(name = "BearerAuth")
public class UserController {

    private final JwtUtil jwtUtil;

	@Autowired
	UserService userService;

    @PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
	    try {

	        UserDTO result = userService.login(dto);
	        return ResponseEntity.ok(Map.of("result", result));  // 프론트에 JSON으로 응답

	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
	    }
	}
    
    
    @PostMapping("/join")
    public ResponseEntity<?> userJoin(@RequestBody UserDTO dto){
    	
    	String result = userService.userJoin(dto);
    	if(result != null) {
    		return ResponseEntity.ok(Map.of("joinCheck", result));
    	}else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("중복된 아이디 입니다.");
        }
    	
    	
    }
	
}
