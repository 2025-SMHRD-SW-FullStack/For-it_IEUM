package com.ieum.kr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ieum.kr.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String>{

}
