package com.proj.first.react.setup.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.proj.first.react.setup.entity.User;
import com.proj.first.react.setup.repository.UserRepository;
import com.proj.first.react.setup.security.Util;

@Controller
public class MainController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private Util util;
	
	final static Logger logger = Logger.getLogger(MainController.class);

	@RequestMapping(value = "/*", method = RequestMethod.GET)
	public String index() {
		return "index";
	}

	@RequestMapping(value = "/api/all", method = RequestMethod.GET, produces = { "application/json" })
	public @ResponseBody Iterable<User> getAllUsers() {
		return userRepository.findAll();
	}

	@RequestMapping(value = "/api/create", method = RequestMethod.POST, produces = { "application/json" })
	public ResponseEntity<String> create(@RequestBody User user, HttpServletResponse response) throws IOException {
		try {
			user.setPassword(user.hashPassword(user.getPassword()));
			userRepository.save(user);
			return ResponseEntity.ok("{\"username\":\"" + user.getUsername() + "\"}");
		} catch (Exception e) {
			logger.info("Error: " + e.getMessage());
			response.sendError(500, "Username Taken");;
			return ResponseEntity.ok(e.getMessage());
		}
	}

	@ModelAttribute
	@RequestMapping(value = "/api/login", method = RequestMethod.POST, produces = { "application/json" })
	public ResponseEntity<Boolean> login(@RequestBody User user, HttpServletResponse response) throws IOException {
		User loggedInUser = userRepository.findByUsername(user.getUsername());
		Boolean loggedIn = loggedInUser.checkPassword(user.getPassword(), loggedInUser.getPassword());
		if (loggedIn) {
			util.createAndAddCreds(response, user.getUsername(), loggedInUser.getPassword());
		} else {
			response.sendError(401, "Unauthorized");
		}
		return ResponseEntity.ok(loggedIn);
	}

	@ModelAttribute
	@RequestMapping(value = "/api/userhome", method = RequestMethod.GET, produces = { "application/json" })
	public @ResponseBody ResponseEntity<User> userHome(HttpServletRequest request) throws IOException {
		return ResponseEntity.ok(userRepository.findByUsername(request.getHeader("User")));
	}

}
