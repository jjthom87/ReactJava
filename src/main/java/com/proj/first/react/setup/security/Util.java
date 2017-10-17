package com.proj.first.react.setup.security;

import java.io.UnsupportedEncodingException;
import java.time.ZonedDateTime;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.proj.first.react.setup.controller.MainController;
import com.proj.first.react.setup.entity.Token;
import com.proj.first.react.setup.entity.User;
import com.proj.first.react.setup.repository.TokenRepository;
import com.proj.first.react.setup.repository.UserRepository;

@Service
public class Util {

	@Autowired
	private TokenRepository tokenRepository;

	@Autowired
	private UserRepository userRepository;

	Date expirationDate = Date.from(ZonedDateTime.now().plusMinutes(60).toInstant());

	final static Logger logger = Logger.getLogger(MainController.class);

	public void createAndAddCreds(HttpServletResponse response, String user, String password)
			throws IllegalArgumentException {
		byte[] authEncBytes = Base64.encodeBase64((user + ":" + password).getBytes());
		response.addHeader("Authorization", "Basic " + new String(authEncBytes));
		response.addHeader("CurrentUser", user);
	}

	public void createTokenAndAddToHeader(HttpServletResponse response, Integer userId, String user)
			throws IllegalArgumentException, UnsupportedEncodingException {
		Token token = new Token();
		Algorithm algorithm = Algorithm.HMAC256("secret");
		String jwt = JWT.create().withIssuer("auth0").withExpiresAt(expirationDate).withClaim("user", user)
				.sign(algorithm);
		token.setToken(jwt);
		token.setUserId(userId);
		tokenRepository.save(token);

		response.addHeader("Auth", jwt);
		response.addHeader("CurrentUser", user);
	}

	@Scheduled(fixedDelay = 10000)
	public String verifyTokenTwo() {
		Iterable<Token> tokens = tokenRepository.findAll();
		for (Token token : tokens) {
			User user = userRepository.findById(token.getUserId());
			try {
				Algorithm algorithm = Algorithm.HMAC256("secret");
				JWTVerifier verifier = JWT.require(algorithm).withIssuer("auth0").acceptExpiresAt(60000)
						.withClaim("user", user.getUsername()).build();
				verifier.verify(token.getToken());
				return "Token Not Expired for " + user.getUsername();
			} catch (JWTVerificationException e) {
				token.setExpired(true);
				tokenRepository.save(token);
				return "Token Expired for " + user.getUsername();
			} catch (UnsupportedEncodingException e) {
				logger.error("Unsupported " + e);
				return "Unsupported " + e;
			}
		}
		return "No JWT Problem";
	}
}
