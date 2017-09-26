package com.proj.first.react.setup.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.proj.first.react.setup.entity.Dildo;
import com.proj.first.react.setup.repository.DildoRepository;

@Controller
public class MainController {

	@Autowired
	private DildoRepository dildoRepository;

	@RequestMapping(value = "/*", method = RequestMethod.GET)
	public String index() {
		return "index";
	}

	@RequestMapping(value = "/api/all", method = RequestMethod.GET, produces = { "application/json" })
	public @ResponseBody Iterable<Dildo> getAllUsers() {
		return dildoRepository.findAll();
	}

	@RequestMapping(value = "/api/create", method = RequestMethod.POST, produces = { "application/json" })
	public ResponseEntity<Dildo> create(@RequestBody Dildo dildo) {
		dildoRepository.save(dildo);
		return ResponseEntity.ok(dildo);
	}
}
