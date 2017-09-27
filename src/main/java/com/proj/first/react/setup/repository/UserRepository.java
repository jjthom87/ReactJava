package com.proj.first.react.setup.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.proj.first.react.setup.entity.User;

public interface UserRepository extends CrudRepository<User, String> {
	List<User> findByFirstName(String name);
}
