package com.ieum.kr.component;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secret;
	private final long EXPIRATION = 1000*60*60; // 1시간
	
	 public String generateToken(String userId) {
	        return Jwts.builder()
	                .setSubject(userId)
	                .setIssuedAt(new Date())
	                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
	                .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
	                .compact();
	    }

	    public String extractUserId(String token) {
	        return Jwts.parserBuilder()
	                .setSigningKey(secret.getBytes())
	                .build()
	                .parseClaimsJws(token)
	                .getBody()
	                .getSubject();
	    }

	    public boolean validateToken(String token) {
	        try {
	            Jwts.parserBuilder()
	                    .setSigningKey(secret.getBytes())
	                    .build()
	                    .parseClaimsJws(token);
	            return true;
	        } catch (JwtException e) {
	            return false;
	        }
	    }
}
