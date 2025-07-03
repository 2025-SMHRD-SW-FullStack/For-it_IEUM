package com.ieum.kr.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ieum.kr.dto.CategoryDTO;
import com.ieum.kr.dto.KeyWordDTO;
import com.ieum.kr.dto.KeywordAllDTO;
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
		
		for(CategoryEntity enty : result) {
			CategoryDTO dto = new CategoryDTO();
			list.add(dto.fromEntity(enty));
		}
		
		return list;  
	}
	
	
	public List<KeyWordDTO> userKeyWordList(KeyWordDTO dto){
		
		System.out.println(dto);
		KeyWordEntity entity = new KeyWordEntity();
		entity.setUserId(dto.getUserId());
		
		
		List<KeyWordEntity> result = keyWordRepository.userKeywordList(entity.getUserId());
		List<KeyWordDTO> list = new ArrayList<KeyWordDTO>();
		
		System.out.println(result);
		for(KeyWordEntity enty : result) {
			KeyWordDTO keyDto = new KeyWordDTO();
			list.add(keyDto.fromEntity(enty));
		}
		
		return list;
	}

	// list select 병합 작업
	public KeywordAllDTO listMerge(KeyWordDTO uDto,CategoryDTO aDto) {
		KeywordAllDTO all = new KeywordAllDTO();
		
		List<CategoryDTO> result = keywordList();
		List<CategoryDTO> cateList = new ArrayList<CategoryDTO>();
		for (CategoryDTO cateDto : result) {
			cateList.add(cateDto);

			all.setKeywordAll(cateList);
		}
		
		if (uDto.getUserId() != null) {
			List<KeyWordDTO> userKeyword = userKeyWordList(uDto);
			List<KeyWordDTO> keyDto = new ArrayList<KeyWordDTO>();

			for (KeyWordDTO userKeywordList : userKeyword) {
				keyDto.add(userKeywordList);

				all.setUserKeyword(keyDto);
			}
		}
		
		return all;
		
	}
	
	
	public void keywordSave(KeyWordDTO dto) {
		System.out.println("[service dto]"+dto);
		KeyWordEntity entity = new KeyWordEntity();
		entity.setUserId(dto.getUserId());
		entity.setHsCode(dto.getHsCode());
		entity.setProductName(dto.getProductName());
		entity.setCheckType(dto.getCheckType());
		keyWordRepository.save(entity);
		
		
		
	}

	
	

	public void keywordDelete(KeyWordDTO dto) {

		KeyWordEntity entity = new KeyWordEntity(dto.getId(),dto.getUserId());
//		entity.setId(dto.getId());
//		entity.setUserId(dto.getUserId());
		System.out.println("[id :"+entity.getId()+"][userId : "+entity.getUserId()+"]");
		keyWordRepository.keywordDel(entity.getId(),entity.getUserId());
		System.out.println("[삭제완료]");
	}
}
