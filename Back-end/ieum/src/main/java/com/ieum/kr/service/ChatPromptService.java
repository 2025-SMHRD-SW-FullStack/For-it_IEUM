package com.ieum.kr.service;

public class ChatPromptService {

	private static final String productPrompt =
			"당신은 무역에 관해 누구나 쉽게 이해할 수 있게 도와주는 수입 전략 전문가입니다:\n\n"+
			"%s";
	
	public String makeProductPrompt(String userInput) {
		return String.format(productPrompt, userInput);
	}
	
}
