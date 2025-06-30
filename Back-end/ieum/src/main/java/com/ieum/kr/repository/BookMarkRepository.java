package com.ieum.kr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ieum.kr.entity.BookMarkEntity;

@Repository
public interface BookMarkRepository extends JpaRepository<BookMarkEntity, Integer>{

}
