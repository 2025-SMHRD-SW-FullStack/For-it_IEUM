package com.ieum.kr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ieum.kr.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, String>{

}
