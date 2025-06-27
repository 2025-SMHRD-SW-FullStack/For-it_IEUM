package com.ieum.kr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.ieum.kr.dto.DetailCategoryDTO;
import com.ieum.kr.dto.MainCategoryDTO;
import com.ieum.kr.dto.ProductDTO;
import com.ieum.kr.dto.SearchDTO;
import com.ieum.kr.dto.TariffInfoDTO;
import com.ieum.kr.service.SearchService;

@Controller
public class SearchController {

	@Autowired
	SearchService searchService;

	@GetMapping("/")
	public String goMain() {
		System.out.println("Main");
		searchService.searchTopRank();
		return "Main";
	}
	
	@PostMapping("/search")
	public String goSearch(SearchDTO dto, Model model) {
		System.out.println(dto);
		if("productName".equals(dto.getChoise())) {
			List<ProductDTO> result = searchService.searchProductName(dto.getKeyword());
			model.addAttribute("result",result);
			System.out.println(result);
		}else {
			int len = dto.getKeyword().length();
			int hsCode;
            try {
                hsCode = Integer.parseInt(dto.getKeyword());
            } catch (NumberFormatException e) {
                model.addAttribute("error", "HS 코드는 숫자만 입력 가능합니다.");
                return "Main";
            }
			if(len < 4) {
				List<MainCategoryDTO> result = searchService.searchMainCategory(dto.getKeyword());
				model.addAttribute("result",result);
				System.out.println(result);
			}else if(len == 4) {
				List<DetailCategoryDTO> result = searchService.searchDetailCategory(dto.getKeyword());
				model.addAttribute("result",result);
				System.out.println(result);
			}else {
				List<TariffInfoDTO> result = searchService.searchLowTariff(dto.getKeyword());
				model.addAttribute("result",result);
				System.out.println(result);
			}
		}
		System.out.println("[이동확인]");
		return "SearchPage";
	}
	
}
