package com.ieum.kr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ieum.kr.entity.KeyWordEntity;

import jakarta.transaction.Transactional;

public interface KeyWordRepository extends JpaRepository<KeyWordEntity, Long>{

	
	@Query(value = """
			SELECT *
			FROM KEY_WORD k
			WHERE k.USER_ID = :userId
		""", nativeQuery = true)
	List<KeyWordEntity> userKeywordList(@Param("userId") String userId);
	
	@Modifying
    @Transactional
	@Query(value = """
			DELETE 
			FROM KEY_WORD k 
			WHERE k.ID = :id
			AND k.USER_ID = :userId
		""",nativeQuery = true)
	int keywordDel(@Param("id") long id, @Param("userId") String userId);

	
}
