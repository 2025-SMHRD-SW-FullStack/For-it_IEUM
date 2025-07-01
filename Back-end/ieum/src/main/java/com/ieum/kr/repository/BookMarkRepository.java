package com.ieum.kr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ieum.kr.entity.BookMarkEntity;

public interface BookMarkRepository extends JpaRepository<BookMarkEntity, Integer> {
	

	@Query(value = """
			SELECT *
			FROM FAVORITE f
			WHERE f.USER_ID = :userID
			AND f.HS_CODE = :hsCode
			AND f.COUNTRY = :country
			AND f.TARIFF = :tariff
		""", nativeQuery = true)
	List<BookMarkEntity> findRecentWithin3Min(@Param("userID") String userID, @Param("hsCode") String hsCode,
			@Param("country") String country, @Param("tariff") float tariff);

//	AND f.`DATE` >= NOW() - INTERVAL 3 MINUTE
	@Query(value = """
			UPDATE FAVORITE f
			SET f.CALCULATION =:calculation
			WHERE f.USER_ID = :userID
			AND f.HS_CODE = :hsCode
			AND f.COUNTRY = :country
			AND f.TARIFF = :tariff
			""", nativeQuery = true)
	String changeCalculation(@Param("calculcation") String calculation,@Param("userID") String userID,
			@Param("hsCode")String hsCode, @Param("country") String country,@Param("tariff") float tariff);

	@Query(value ="""
			UPDATE FAVORITE f
			SET f.CHATGPT_ANSWER =:chatGPTAnswer
			WHERE f.USER_ID = :userID
			AND f.HS_CODE = :hsCode
			AND f.COUNTRY = :country
			AND f.TARIFF = :tariff
			""", nativeQuery=true)
	String changeChatGPTAnswer(@Param("chatGPTAnswer") String chatGPTAnswer,@Param("userID") String userID,
			@Param("hsCode")String hsCode, @Param("country") String country,@Param("tariff") float tariff);
	
}
