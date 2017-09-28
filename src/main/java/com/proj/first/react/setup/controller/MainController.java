package com.proj.first.react.setup.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.proj.first.react.setup.entity.User;
import com.proj.first.react.setup.repository.UserRepository;

@Controller
public class MainController {

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(value = "/*", method = RequestMethod.GET)
	public String index() {
		return "index";
	}

	@RequestMapping(value = "/api/all", method = RequestMethod.GET, produces = { "application/json" })
	public @ResponseBody Iterable<User> getAllUsers() {
		return userRepository.findAll();
	}

	@RequestMapping(value = "/api/create", method = RequestMethod.POST, produces = { "application/json" })
	public ResponseEntity<User> create(@RequestBody User user) {
		user.setPassword(user.passwordEncoder(user.getPassword()));
		userRepository.save(user);
		return ResponseEntity.ok(user);
	}

}
