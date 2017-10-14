package com.proj.first.react.setup.security;

import java.io.UnsupportedEncodingException;
import java.time.ZonedDateTime;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
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

	Date expirationDate = Date.from(ZonedDateTime.now().plusMinutes(1).toInstant());

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

	public String verifyToken(String token, String user) {
		try {
			Algorithm algorithm = Algorithm.HMAC256("secret");
			JWTVerifier verifier = JWT.require(algorithm).acceptLeeway(1).withIssuer("auth0").acceptExpiresAt(1)
					.withClaim("user", user).build();
			DecodedJWT jwt = verifier.verify(token);
			return jwt.getExpiresAt().toString();
		} catch (UnsupportedEncodingException exception) {
			return "Got to here " + exception.getMessage();
		} catch (JWTVerificationException exception) {
			Iterable<Token> tokens = tokenRepository.findAll();
			User tokenUser = userRepository.findByUsername(user);
			System.out.println(tokenUser);
			for (Token userToken : tokens) {
				if (userToken.getUserId().equals(tokenUser.getId())) {
					tokenRepository.delete(userToken);
				}
			}
			return "Jwt here " + exception.getMessage();
		}
	}
}
