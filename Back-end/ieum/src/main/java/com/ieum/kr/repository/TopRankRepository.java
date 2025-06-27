package com.ieum.kr.repository;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ieum.kr.entity.RankEntity;

public interface TopRankRepository extends JpaRepository<RankEntity, String>{
	@Query(value = """
		    SELECT
		      s.hs_code      AS hsCode,
		      s.product_name AS productName,
		      COUNT(*)       AS cnt
		    FROM search_list s
		    WHERE s.date BETWEEN :lastDate AND :today
		    GROUP BY s.hs_code, s.product_name
		    ORDER BY cnt DESC
		    LIMIT 5
		    """,
		    nativeQuery = true
		)
	List<RankEntity> findTopByCount(
		    @Param("lastDate") LocalDate lastDate,
		    @Param("today")    LocalDate today
	    );
}
