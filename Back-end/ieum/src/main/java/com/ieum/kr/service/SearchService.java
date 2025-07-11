package com.ieum.kr.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.ieum.kr.dto.CalculationDTO;
import com.ieum.kr.dto.RankDTO;
import com.ieum.kr.dto.RankProjection;
import com.ieum.kr.dto.TariffInfoDTO;
import com.ieum.kr.entity.RankEntity;
import com.ieum.kr.repository.TopRankRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class SearchService {

	@Autowired
	RestTemplate restTemplate;

	@Autowired
	TopRankRepository topRankRepo;
	
	@PersistenceContext
	private EntityManager em;
	
	String baseURL = "http://localhost:8010";
	
	@Transactional
	public void saveSearchData(RankDTO dto) {
		RankEntity entity = dto.toEntity();
		em.persist(entity);
//		topRankRepo.save(dto.toEntity());
	}

	// hs_code로 검색했을경우
	public List<TariffInfoDTO> searchProduct(String hsCode){
		String sanitized = hsCode.replaceAll("\\D+", "");
		String url = baseURL + "/api/search-by-code?code="+sanitized;
		ResponseEntity<TariffInfoDTO[]> response = restTemplate.getForEntity(url, TariffInfoDTO[].class);
		TariffInfoDTO[] product = response.getBody();
		List<TariffInfoDTO> list = Arrays.asList(product);
		return list;
	}
	
	// 물품명으로 검색
	public List<TariffInfoDTO> searchProductName(String productName){
		String url = baseURL + "/api/search-by-name?keyword="+productName;
		ResponseEntity<TariffInfoDTO[]> response = restTemplate.getForEntity(url, TariffInfoDTO[].class);
		TariffInfoDTO[] product = response.getBody();
		List<TariffInfoDTO> list = Arrays.asList(product);
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
            물품 가격: %,d원 (%d개 × %,d원)
            CIF 기준 가격: %,d원
            관세 (FTA %.1f%%): %,d원
            부가세 (VAT 10%%): %,d원
            총 세금: %,d원

            ✅ 총 수입 비용: 약 %,d원
            1개당 총 수입단가: 약 %,d원

            ✅ 차이점: %,d원
            """.formatted(
                productPrice, quantityInt, dto.getPrice(),
                cifPrice,
                dto.getTariff()*100,   // 1.2 → "1.2%"
                tariffPrice,
                vat, totalTax, totalCost,
                perUnit, minPriceDiff
        );
		dto.setCalculation(result);
		return dto;
	}
	
}
