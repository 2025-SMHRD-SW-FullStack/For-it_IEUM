package com.ieum.kr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ieum.kr.entity.NewsEntity;

public interface NewsRepository extends JpaRepository<NewsEntity, Long>{

}
