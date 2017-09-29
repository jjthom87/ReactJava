package com.proj.first.react.setup.security;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

@Service
public class Util {

	public void createAndAddCreds(HttpServletResponse response, String user, String password) {
		byte[] authEncBytes = Base64.encodeBase64((user + ":" + password).getBytes());
		response.addHeader("Authorization", "Basic " + new String(authEncBytes));
		response.addHeader("CurrentUser", user);
	}
}
