package com.proj.first.react.setup.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.proj.first.react.setup.entity.Dildo;

public interface DildoRepository extends CrudRepository<Dildo, String> {

	List<Dildo> findByName(String name);
}
