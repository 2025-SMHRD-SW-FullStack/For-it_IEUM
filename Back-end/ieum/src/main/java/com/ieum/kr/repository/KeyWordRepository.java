package com.ieum.kr.repository;

import java.util.List;

import org.apache.ibatis.annotations.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ieum.kr.entity.KeyWordEntity;

public interface KeyWordRepository extends JpaRepository<KeyWordEntity, Long>{

	
	@Query(value = """
			SELECT *
			FROM KEY_WORD k
			WHERE k.USER_ID = :userId
		""", nativeQuery = true)
	List<KeyWordEntity> userKeywordList(@Param("userId") String userId);
	
}
