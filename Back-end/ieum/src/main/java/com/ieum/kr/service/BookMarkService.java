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
	
	public void saveBookMark(BookMarkDTO dto) {
		System.out.println(dto);
		LocalDateTime now = dto.getDate()
				.atZoneSameInstant(ZoneOffset.UTC)
				.withZoneSameInstant(ZoneId.of("Asia/Seoul"))
				.toLocalDateTime();
		List<BookMarkEntity> recent = bookmarkrepo.findRecentWithin3Min(dto.getUserID(), dto.getHsCode(), dto.getCountry(), dto.getTariff());
		if(recent.isEmpty()) {
			System.out.println("비어있음");
			bookmarkrepo.save(dto.toEntity());
		}else{
			System.out.println("값이있음");
			//recent.get(0).getCalculation().equals(dto.getCalculation())
			if(!dto.getCalculation().isEmpty() && dto.getChatGPTAnswer().isEmpty()) {
				bookmarkrepo.changeCalculation(dto.getCalculation(), dto.getUserID(), dto.getHsCode(), dto.getCountry(), dto.getTariff());
			}else if(dto.getCalculation().isEmpty() && !dto.getChatGPTAnswer().isEmpty()) {
				bookmarkrepo.changeChatGPTAnswer(dto.getChatGPTAnswer(), dto.getUserID(), dto.getHsCode(), dto.getCountry(), dto.getTariff());
			}
		}
	}
	
}
