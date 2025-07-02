package com.ieum.kr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ieum.kr.component.JwtUtil;
import com.ieum.kr.dto.LoginDTO;
import com.ieum.kr.dto.UserDTO;
import com.ieum.kr.entity.UserEntity;
import com.ieum.kr.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	@Autowired
	UserRepository userRepository;
	private final JwtUtil jwtUtil;
	
	public UserDTO login(LoginDTO dto) {
		UserDTO userDto = new UserDTO();
        Optional<UserEntity> userOpt = userRepository.findById(dto.getUserId());

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(dto.getPassword())) {
            // JWT 발급
            String token = jwtUtil.generateToken(dto.getUserId());
            userDto.setToken(token);
            userDto.setName(userOpt.get().getName());
            System.out.println(dto);
            return userDto;
        } else {
            throw new RuntimeException("아이디 또는 비밀번호 오류");
        }
    }

	public String userJoin(UserDTO dto) {
		// TODO Auto-generated method stub
		
		UserEntity entity = new UserEntity();
		
		Optional<UserEntity> userOpt = userRepository.findById(dto.getUserId());
		if (!userOpt.isPresent()) {
			System.out.println("회원이 아닙니다.");
			entity.setUserId(dto.getUserId());
			entity.setPassword(dto.getPassword());
			entity.setName(dto.getName());
			entity.setEmail(dto.getEmail());
			entity.setPhoneNumber(dto.getPhoneNumber());
			entity.setServiceCheck(dto.getServiceCheck());
			
			userRepository.save(entity);
			return "회원가입 성공";
		}else {
//			throw new RuntimeException("중복된 아이디 입니다.");
			return null;
		}
	}
	
	public String getUserInfo(String authHeader) {
      System.out.println("[getUserInfo 컨트롤러 접근]");
      System.out.println("Authorization Header: " + authHeader); // ✅ 헤더값 확인

      String token = authHeader.replace("Bearer ", "");
      System.out.println("Extracted Token: " + token); // ✅ Bearer 제거 후 토큰만

      if (jwtUtil.validateToken(token)) {
          String userId = jwtUtil.extractUserId(token); // 토큰 값을 userId로 변환 해줌
          System.out.println("UserId from token: " + userId); // ✅ 최종 파싱된 userId
          return userId;
      } else {
          return "토큰이 유효하지 않음";
      }
  }
	
	
}
