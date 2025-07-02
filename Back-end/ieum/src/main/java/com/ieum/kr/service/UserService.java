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
	
	
	
}
