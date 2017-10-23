package com.proj.first.react.setup.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.proj.first.react.setup.entity.Activity;

public interface ActivityRepository extends CrudRepository<Activity, String> {
	List<Activity> findByUserId(Integer userId);
}