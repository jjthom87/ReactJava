package com.proj.first.react.setup.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.proj.first.react.setup.entity.Token;

public interface TokenRepository extends CrudRepository<Token, String> {
	List<Token> findByUserId(Integer userId);
}