package com.ieum.kr.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

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

	public List<BookMarkDTO> bookMarkList(String userID) {
		List<BookMarkDTO> list = bookmarkrepo.findAllByUserID(userID);
		return list;
	}

	@Transactional
	public String saveBookMark(BookMarkDTO dto) {

		int updated = bookmarkrepo.updateByUserAndHs(
			    dto.getPrice(),
			    dto.getQuantity(),
			    dto.getCalculation(),
			    dto.getChatGPTAnswer(),
			    LocalDateTime.now(ZoneId.of("Asia/Seoul")).truncatedTo(ChronoUnit.SECONDS),
			    dto.getUserID(),
			    dto.getHsCode()
			);
			if (updated > 0) {
			    return "update";
			} else {
			    BookMarkEntity e = dto.toEntity();
			    e.setDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")).truncatedTo(ChronoUnit.SECONDS));
			    bookmarkrepo.save(e);
			    return "save";
			}

	}

	public String delBookMark(BookMarkDTO dto) {
		try {
			bookmarkrepo.deleteById(dto.getSeqNumber());
		} catch (Exception e) {
			return "fail";
		}
		return "success";
	}

}
