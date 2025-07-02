package com.ieum.kr.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ieum.kr.dto.CategoryDTO;
import com.ieum.kr.dto.KeyWordDTO;
import com.ieum.kr.dto.NewsDTO;
import com.ieum.kr.entity.CategoryEntity;
import com.ieum.kr.entity.KeyWordEntity;
import com.ieum.kr.repository.CategoryRepository;
import com.ieum.kr.repository.KeyWordRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository cateRepository;
	
	@Autowired
	KeyWordRepository keyWordRepository;
	
	public List<CategoryDTO> keywordList() {
		
		List<CategoryEntity> result = cateRepository.findAll();
		
		List<CategoryDTO> list = new ArrayList<CategoryDTO>(); 
		
		for(CategoryEntity enti : result) {
			CategoryDTO dto = new CategoryDTO();
			list.add(dto.fromEntity(enti));
		}
		
		return list;  
	}
	
	
	public List<KeyWordDTO> userKeyWordList(KeyWordDTO dto){
		
		KeyWordEntity entity = new KeyWordEntity();
		entity.setUserId(dto.getUserId());
		
		List<KeyWordDTO> result = new ArrayList<>();
		System.out.println(KeyWordDTO.fromEntity(keyWordRepository.findById(entity.getUserId())));
		
//		keyWordRepository.findById(entity.getUserId());
		return null;
	}
}
