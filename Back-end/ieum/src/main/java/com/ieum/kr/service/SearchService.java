package com.ieum.kr.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ieum.kr.dto.CalculationDTO;
import com.ieum.kr.dto.ProductDTO;
import com.ieum.kr.dto.RankDTO;
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
		LocalDate now = LocalDate.now();
		RankDTO rank = new RankDTO(dto.getHsCode(),dto.getProductName(),now);
		topRankRepo.save(rank.toEntity());
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
	
	// 관세계산
	public CalculationDTO useCalcul(CalculationDTO dto) {
		
        BigDecimal priceBd    = BigDecimal.valueOf(dto.getPrice());
        BigDecimal qtyBd      = BigDecimal.valueOf(dto.getQuantity());

        BigDecimal productBd  = priceBd.multiply(qtyBd);
        BigDecimal cifRate    = new BigDecimal("1.1"); // 운임,보험료 약 10% 가정
        BigDecimal cifBd      = productBd
                                      .multiply(cifRate)
                                      .setScale(0, RoundingMode.HALF_UP);

        BigDecimal tariffRateFraction = BigDecimal.valueOf(dto.getTariff())
                                                 .divide(
                                                     BigDecimal.valueOf(100),
                                                     6,                   
                                                     RoundingMode.HALF_UP
                                                 );
        BigDecimal tariffBd = cifBd
                                    .multiply(tariffRateFraction)
                                    .setScale(0, RoundingMode.HALF_UP);

        BigDecimal vatRate  = new BigDecimal("0.1");
        BigDecimal vatBd    = cifBd
                                    .add(tariffBd)
                                    .multiply(vatRate)
                                    .setScale(0, RoundingMode.HALF_UP);

        BigDecimal totalTaxBd   = tariffBd.add(vatBd);
        BigDecimal totalCostBd  = cifBd.add(totalTaxBd);
        BigDecimal perUnitBd    = totalCostBd
                                    .divide(qtyBd, 0, RoundingMode.HALF_UP);

        BigDecimal normalRateBd = BigDecimal.valueOf(dto.getTax())
                                            .divide(
                                                BigDecimal.valueOf(100),
                                                6,
                                                RoundingMode.HALF_UP
                                            );
        BigDecimal normalTaxBd  = cifBd.multiply(normalRateBd)
                                       .setScale(0, RoundingMode.HALF_UP);
        BigDecimal normalVatBd  = cifBd
                                       .add(normalTaxBd)
                                       .multiply(vatRate)
                                       .setScale(0, RoundingMode.HALF_UP);
        BigDecimal diffBd       = normalTaxBd
                                       .add(normalVatBd)
                                       .subtract(totalTaxBd);

        long productPrice = productBd.longValue();
        long quantityInt  = qtyBd.setScale(0, RoundingMode.HALF_UP).longValue();
        long cifPrice     = cifBd.longValue();
        long tariffPrice  = tariffBd.longValue();
        long vat          = vatBd.longValue();
        long totalTax     = totalTaxBd.longValue();
        long totalCost    = totalCostBd.longValue();
        long perUnit      = perUnitBd.longValue();
        long minPriceDiff = diffBd.longValue();

        String result = """
            ✅ 수입 원가 계산 (FTA 적용 기준)
            물품 가격: %,d원 (%d대 × %,d원)
            CIF 기준 가격: %,d원
            관세 (FTA %.1f%%): %,d원
            부가세 (VAT 10%%): %,d원
            총 세금: %,d원

            ✅ 총 수입 비용: 약 %,d원
            1대당 총 수입단가: 약 %,d원

            ✅ 차이점: %,d원
            """.formatted(
                productPrice, quantityInt, dto.getPrice(),
                cifPrice,
                dto.getTariff(),   // 1.2 → "1.2%"
                tariffPrice,
                vat, totalTax, totalCost,
                perUnit, minPriceDiff
        );
		dto.setCalculation(result);
		return dto;
	}

}
