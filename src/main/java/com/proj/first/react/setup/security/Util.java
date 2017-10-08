package com.proj.first.react.setup.security;

import java.io.UnsupportedEncodingException;
import java.time.ZonedDateTime;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.proj.first.react.setup.entity.Token;
import com.proj.first.react.setup.repository.TokenRepository;

@Service
public class Util {
	
	@Autowired
	private TokenRepository tokenRepository;

	public void createAndAddCreds(HttpServletResponse response, String user, String password)
			throws IllegalArgumentException {
		byte[] authEncBytes = Base64.encodeBase64((user + ":" + password).getBytes());
		response.addHeader("Authorization", "Basic " + new String(authEncBytes));
		response.addHeader("CurrentUser", user);
	}

	public void createTokenAndAddToHeader(HttpServletResponse response, Integer userId, String user) throws IllegalArgumentException, UnsupportedEncodingException {
	    Date expirationDate = Date.from(ZonedDateTime.now().plusMinutes(60).toInstant());
	    Token token = new Token();
		Algorithm algorithm = Algorithm.HMAC256("secret");
		String jwt = JWT.create()
                .withExpiresAt(expirationDate)
                .withClaim("username", user)
                .sign(algorithm);
		token.setToken(jwt);
		token.setUserId(userId);
		tokenRepository.save(token);
		
		response.addHeader("Auth", jwt);
		response.addHeader("CurrentUser", user);
	}
}
