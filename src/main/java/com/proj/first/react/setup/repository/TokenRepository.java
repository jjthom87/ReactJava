package com.proj.first.react.setup.repository;

import org.springframework.data.repository.CrudRepository;

import com.proj.first.react.setup.entity.Token;

public interface TokenRepository extends CrudRepository<Token, String> {
	Token findByUserId(Integer userId);
}
