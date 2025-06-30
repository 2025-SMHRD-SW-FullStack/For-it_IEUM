package com.ieum.kr.repository;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ieum.kr.entity.RankEntity;
import com.ieum.kr.dto.RankProjection;

public interface TopRankRepository extends JpaRepository<RankEntity, String>{
    @Query(
    	      value = """
    	        SELECT
    	          s.HS_CODE      AS hsCode,
    	          s.PRODUCT_NAME AS productName,
    	          COUNT(*)       AS cnt
    	        FROM SEARCH_LIST s
    	        WHERE s.`DATE` BETWEEN :lastDate AND :today
    	        GROUP BY s.HS_CODE, s.PRODUCT_NAME
    	        ORDER BY cnt DESC
    	        LIMIT 5
    	      """,
    	      nativeQuery = true
    	    )
	List<RankProjection> findTopByCount(
		    @Param("lastDate") LocalDate lastDate,
		    @Param("today")    LocalDate today
	    );
}
