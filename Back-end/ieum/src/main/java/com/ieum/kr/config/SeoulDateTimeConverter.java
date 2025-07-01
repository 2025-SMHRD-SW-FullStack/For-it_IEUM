package com.ieum.kr.config;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class SeoulDateTimeConverter
    implements AttributeConverter<OffsetDateTime, Timestamp> {

    private static final ZoneId SEOUL = ZoneId.of("Asia/Seoul");
    private static final ZoneOffset OFFSET = SEOUL.getRules().getOffset(Instant.now());

    /** 엔티티 → DB 저장 */
    @Override
    public Timestamp convertToDatabaseColumn(OffsetDateTime attribute) {
        if (attribute == null) return null;
        // OffsetDateTime 을 서울 로컬 LocalDateTime 으로 변환 후 Timestamp 로
        return Timestamp.valueOf(
            attribute.atZoneSameInstant(ZoneOffset.UTC)   // 만약 DTO로 UTC가 넘어온다면 생략 가능
                     .withZoneSameInstant(SEOUL)
                     .toLocalDateTime()
        );
    }

    /** DB 조회 → 엔티티 */
    @Override
    public OffsetDateTime convertToEntityAttribute(Timestamp dbData) {
        if (dbData == null) return null;
        // DB의 LocalDateTime 을 서울 offset 붙인 OffsetDateTime 으로
        return dbData.toLocalDateTime()
                     .atOffset(OFFSET);
    }
}
