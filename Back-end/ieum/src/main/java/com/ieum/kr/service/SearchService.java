package com.ieum.kr.service;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ieum.kr.dto.ProductDTO;
import com.ieum.kr.dto.RankProjection;
import com.ieum.kr.dto.TariffInfoDTO;
import com.ieum.kr.entity.RankEntity;
import com.ieum.kr.repository.TopRankRepository;

@Service
public class SearchService {

	@Autowired
	RestTemplate restTemplate;

	@Autowired
	TopRankRepository topRankRepo;
	
	String baseURL = "http://localhost:8010";

	// hs_code가 3자리 이하일때 대분류를 찾는 기능
	public List<ProductDTO> searchMainCategory(String hsCode) {
		String url = baseURL + "/api/main-categories?input_code=" + hsCode;
		ResponseEntity<ProductDTO[]> response = restTemplate.getForEntity(url, ProductDTO[].class);
		ProductDTO[] categories = response.getBody();
		List<ProductDTO> list = Arrays.asList(categories);
		return list;
	}

	// hs_code가 4자리 이상일 경우 세부사항 출력
	public List<ProductDTO> searchDetailCategory(String hsCode) {
		String url = baseURL + "/api/subcategories?main_code=" + hsCode;
		ResponseEntity<ProductDTO[]> response = restTemplate.getForEntity(url, ProductDTO[].class);
		ProductDTO[] categories = response.getBody();
		List<ProductDTO> list = Arrays.asList(categories);
		return list;
	}
	
	// 소분류로 검색했을때 최저관세 10개 출력
	public List<TariffInfoDTO> searchLowTariff(String hsCode) {
		String url = baseURL + "/api/tariff-info?hs_code="+hsCode;
		ResponseEntity<TariffInfoDTO> response = restTemplate.getForEntity(url, TariffInfoDTO.class);
		TariffInfoDTO dto = response.getBody();
		List<TariffInfoDTO> list = Arrays.asList(dto);
		return list;
	}
	
	// 품목명으로 검색했을때
	public List<ProductDTO> searchProductName(String productName) {
		String url = baseURL + "/api/search-by-name?keyword="+productName;
		ResponseEntity<ProductDTO[]> response = restTemplate.getForEntity(url, ProductDTO[].class);
		ProductDTO[] categories = response.getBody();
		List<ProductDTO> list = Arrays.asList(categories);
		return list;
	}
	
	// 검색 순위 출력
	public List<RankProjection> searchTopRank() {
		LocalDate lastDate = LocalDate.now().minusDays(14);
		LocalDate today = LocalDate.now();
		List<RankProjection> list = topRankRepo.findTopByCount(lastDate,today);
		return list;
	}

}
