package com.proj.first.react.setup.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.proj.first.react.setup.email.SendEmail;
import com.proj.first.react.setup.entity.Token;
import com.proj.first.react.setup.entity.User;
import com.proj.first.react.setup.repository.TokenRepository;
import com.proj.first.react.setup.repository.UserRepository;
import com.proj.first.react.setup.security.Util;

@Controller
public class MainController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TokenRepository tokenRepository;

	@Autowired
	private Util util;

	@Autowired
	private SendEmail sendEmail;

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
			sendEmail.sendMail(user.getUid());
			return ResponseEntity.ok("{\"username\":\"" + user.getUsername() + "\"}");
		} catch (Exception e) {
			logger.info("Error: " + e.getMessage());
			response.sendError(500, "Username Taken");
			return ResponseEntity.ok(e.getMessage());
		}
	}

	@ModelAttribute
	@RequestMapping(value = "/api/login", method = RequestMethod.POST, produces = { "application/json" })
	public ResponseEntity<Boolean> login(@RequestBody User user, HttpServletResponse response) throws IOException {
		User loggedInUser = userRepository.findByUsername(user.getUsername());
		if (loggedInUser.getVerified()) {
			Boolean loggedIn = loggedInUser.checkPassword(user.getPassword(), loggedInUser.getPassword());
			if (loggedIn) {
				util.createTokenAndAddToHeader(response, loggedInUser.getId(), loggedInUser.getUsername());
			} else {
				response.sendError(401, "Unauthorized");
			}
			return ResponseEntity.ok(loggedIn);
		} else {
			response.sendError(500, "Unverified");
			return ResponseEntity.ok(false);
		}
	}

	@ModelAttribute
	@RequestMapping(value = "/api/userhome", method = RequestMethod.GET, produces = { "application/json" })
	public @ResponseBody ResponseEntity<User> userHome(HttpServletRequest request) throws IOException {
		if (!"null".equals(request.getHeader("User"))) {
			return ResponseEntity.ok(userRepository.findByUsername(request.getHeader("User")));
		}
		return ResponseEntity.ok(new User());
	}

	@RequestMapping(value = "/api/login-page", method = RequestMethod.GET, produces = { "application/json" })
	public @ResponseBody ResponseEntity<String> loginPage(HttpServletRequest request) throws IOException {
		if (!"null".equals(request.getHeader("User"))) {
			return ResponseEntity.ok("{\"userLoggedIn\":true}");
		}
		return ResponseEntity.ok("{\"userLoggedIn\":false}");
	}

	@RequestMapping(value = "/api/logout", method = RequestMethod.GET, produces = { "application/json" })
	public @ResponseBody ResponseEntity<String> logout(HttpServletRequest request) throws IOException {
		User user = userRepository.findByUsername(request.getHeader("User"));
		Token token = tokenRepository.findByUserId(user.getId());
		tokenRepository.delete(token);
		return ResponseEntity.ok("{\"userLoggedOut\":true}");
	}

	@RequestMapping(value = "/api/mainpage", method = RequestMethod.GET, produces = { "application/json" })
	public @ResponseBody ResponseEntity<User> mainPage(HttpServletRequest request) throws IOException {
		if (!"null".equals(request.getHeader("User"))) {
			return ResponseEntity.ok(userRepository.findByUsername(request.getHeader("User")));
		}
		return ResponseEntity.ok(new User());
	}

	@RequestMapping(value = "/api/email-conf/{uid}", method = RequestMethod.GET, produces = {
			MediaType.TEXT_HTML_VALUE })
	public @ResponseBody ResponseEntity<String> emailConfirmation(HttpServletRequest request, @PathVariable String uid)
			throws IOException {
		User user = userRepository.findByUid(uid);
		user.setVerified(true);
		userRepository.save(user);
		return ResponseEntity.ok(htmlString());
	}

	public String htmlString() {
		return "<html>"
				+ "<head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'></head>"
				+ "<script type='text/javascript'>window.location.href = 'http://localhost:8080/login'</script>"
				+ "<body>"
				+ "<h3>If you are not redirect, please click button...</h3><a type='button' class='btn btn-success' href='http://localhost:8080/login'>Login Now</a>"
				+ "</body>" + "</html>";
	}

}
