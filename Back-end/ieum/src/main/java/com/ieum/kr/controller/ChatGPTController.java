package com.ieum.kr.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ieum.kr.dto.ChatGPTRequest;
import com.ieum.kr.dto.ChatGPTResponse;
import com.ieum.kr.service.ChatGPTService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class ChatGPTController {

	private final ChatGPTService service;
	
	@GetMapping
    public String hello() {
        return "POST { \"prompt\": \"...\" } to this endpoint.";
    }
    
    @PostMapping
    public ChatGPTResponse chat(@RequestBody ChatGPTRequest request) {
        System.out.println(request);
    	String answer = service.ask(request.prompt());
    	System.out.println("GPT 대답 확인 : " + answer);
        return new ChatGPTResponse(answer);
    }
	
}
