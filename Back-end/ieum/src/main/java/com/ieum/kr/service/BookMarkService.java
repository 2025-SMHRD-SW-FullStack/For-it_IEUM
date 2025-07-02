package com.ieum.kr.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ieum.kr.dto.BookMarkDTO;
import com.ieum.kr.entity.BookMarkEntity;
import com.ieum.kr.repository.BookMarkRepository;

@Service
public class BookMarkService {
	
	@Autowired
	BookMarkRepository bookmarkrepo;
	
	public String saveBookMark(BookMarkDTO dto) {
		LocalDateTime now = dto.getDate()
				.atZoneSameInstant(ZoneOffset.UTC)
				.withZoneSameInstant(ZoneId.of("Asia/Seoul"))
				.toLocalDateTime();
		List<BookMarkEntity> recent = bookmarkrepo.findRecentWithin3Min(dto.getUserID(), dto.getHsCode(), dto.getCountry(), dto.getTariff());
		
		String result;
		
		if(recent.isEmpty()) {
			bookmarkrepo.save(dto.toEntity());
			return result="save";
		}
		
		
		
		return result="";
		/*
		 * if(recent.isEmpty()) { bookmarkrepo.save(dto.toEntity()); }else{
		 * //recent.get(0).getCalculation().equals(dto.getCalculation())
		 * if(!dto.getCalculation().isEmpty() && dto.getChatGPTAnswer().isEmpty()) {
		 * bookmarkrepo.changeCalculation(dto.getCalculation(), dto.getUserID(),
		 * dto.getHsCode(), dto.getCountry(), dto.getTariff()); }else
		 * if(dto.getCalculation().isEmpty() && !dto.getChatGPTAnswer().isEmpty()) {
		 * bookmarkrepo.changeChatGPTAnswer(dto.getChatGPTAnswer(), dto.getUserID(),
		 * dto.getHsCode(), dto.getCountry(), dto.getTariff()); } }
		 */
	}
	
}
