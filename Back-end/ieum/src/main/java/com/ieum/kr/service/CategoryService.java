package com.ieum.kr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ieum.kr.dto.CategoryDTO;
import com.ieum.kr.entity.CategoryEntity;
import com.ieum.kr.repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository cateRepository;
	
	public List<CategoryEntity> CategoryAllList() {
		
		
		
		return cateRepository.findAll();  
	}
	
}
