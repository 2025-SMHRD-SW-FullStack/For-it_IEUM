package com.ieum.kr.service;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

import org.hibernate.validator.internal.util.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.ieum.kr.dto.BookMarkDTO;
import com.ieum.kr.entity.BookMarkEntity;
import com.ieum.kr.repository.BookMarkRepository;

@Service
public class BookMarkService {
	
	@Autowired
	BookMarkRepository bookmarkrepo;
	
	@Transactional
	public String saveBookMark(BookMarkDTO dto) {
//		LocalDateTime now = dto.getDate()
//				.atZoneSameInstant(ZoneOffset.UTC)
//				.withZoneSameInstant(ZoneId.of("Asia/Seoul"))
//				.toLocalDateTime();
		//List<BookMarkEntity> recent = bookmarkrepo.findRecentWithin3Min(dto.getUserID(), dto.getHsCode(), dto.getCountry(), dto.getTariff());

		OffsetDateTime now = OffsetDateTime.now(ZoneId.of("Asia/Seoul"));
        OffsetDateTime threeMinAgo = now.minusMinutes(3);

        Optional<BookMarkEntity> recent = bookmarkrepo.findTopByHsCodeAndCountryAndTariffAndDateBetweenOrderByDateDesc(
            dto.getHsCode(), dto.getCountry(), dto.getTariff(), threeMinAgo, now
        );
        System.out.printf("검색: hsCode=%s, country=%s, tariff=%f, from=%s, to=%s%n",
        	    dto.getHsCode(), dto.getCountry(), dto.getTariff(),
        	    threeMinAgo, now);
		if(recent.isEmpty()) {
			BookMarkEntity newEntity = dto.toEntity();
			newEntity.setDate(now);
			bookmarkrepo.save(newEntity);
			return "save";
		}

		BookMarkEntity bookEntity = recent.get();
		boolean hasCal = StringUtils.hasText(dto.getCalculation());
		boolean hasAnswer = StringUtils.hasText(dto.getChatGPTAnswer());
		
		if(hasCal && !hasAnswer) {
			if(!StringUtils.hasText(bookEntity.getCalculation())) {
				bookEntity.setCalculation(dto.getCalculation());
				bookEntity.setDate(now);
				bookmarkrepo.save(bookEntity);
				return "update";
			}else {
				BookMarkEntity newEntity = dto.toEntity();
				newEntity.setDate(now);
				bookmarkrepo.save(newEntity);
				return "save";
			}
		}
		
		if(!hasCal && hasAnswer) {
			if(!StringUtils.hasText(bookEntity.getChatGPTAnswer())) {
				bookEntity.setChatGPTAnswer(dto.getChatGPTAnswer());
				bookEntity.setDate(now);
				bookmarkrepo.save(bookEntity);
				return "update";
			}else {
				BookMarkEntity newEntity = dto.toEntity();
				newEntity.setDate(now);
				bookmarkrepo.save(newEntity);
				return "save";
			}
		}
		
		if(hasCal && hasAnswer) {
			boolean sameCal = dto.getCalculation().equals(bookEntity.getCalculation());
			boolean sameAnswer = dto.getChatGPTAnswer().equals(bookEntity.getChatGPTAnswer());
			if(sameCal && sameAnswer) {
				return "이미 저장된 계산값과 답변입니다.";
			}else {
				BookMarkEntity newEntity = dto.toEntity();
				newEntity.setDate(now);
				bookmarkrepo.save(newEntity);
				return "save";
			}
		}
		
		return "이미 저장된 값입니다.";
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
