package com.ieum.kr.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.ieum.kr.dto.BookMarkDTO;
import com.ieum.kr.entity.BookMarkEntity;

public interface BookMarkRepository extends JpaRepository<BookMarkEntity, Integer> {
	
//    Optional<BookMarkEntity> findTopByHsCodeAndCountryAndTariffAndDateBetweenOrderByDateDesc(
//            String hsCode,
//            String country,
//            float tariff,
//            LocalDateTime from,
//            LocalDateTime to
//        );
    @Modifying
    @Transactional
    @Query("UPDATE BookMarkEntity b " +
           "SET b.price         = :price, " +
           "    b.quantity      = :quantity, " +
           "    b.calculation   = :calculation, " +
           "    b.chatGPTAnswer = :chatGPTAnswer, " +
           "    b.date          = :date " +
           "WHERE b.userID = :userID " +
           "  AND b.hsCode = :hsCode")
    int updateByUserAndHs(
        @Param("price")         int price,
        @Param("quantity")      float quantity,
        @Param("calculation")   String calculation,
        @Param("chatGPTAnswer") String chatGPTAnswer,
        @Param("date")          LocalDateTime date,
        @Param("userID")        String userID,
        @Param("hsCode")        String hsCode
    );
    
	List<BookMarkDTO> findAllByUserID(String userID);
	
    @Modifying
    @Transactional
    @Query("DELETE FROM BookMarkEntity b " +
           " WHERE b.userID = :userID " +
           "   AND b.seqNumber = :seqNumber")
    int deleteByUserIDAndSeqNumberJPQL(
        @Param("userID") String userID,
        @Param("seqNumber") int seqNumber
    );
    @Modifying
    @Transactional
    @Query("DELETE FROM BookMarkEntity b " +
           " WHERE b.userID = :userID " +
           "   AND b.hsCode = :hsCode")
    int deleteByUserIDAndHsCodeJPQL(
        @Param("userID") String userID,
        @Param("hsCode") String hsCode
    );
    
}
