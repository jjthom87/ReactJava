package com.proj.first.react.setup.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
	@Id
	@GeneratedValue
	private Integer id;

	private String name;
	private String username;
			
	private String password;
	
	public String hashPassword(String password_plaintext) {
		return BCrypt.hashpw(password_plaintext, BCrypt.gensalt());
	}

	public String passwordEncoder(String password) {
		int i = 0;
		String hashedPassword = null;
		while (i < 10) {
			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			hashedPassword = passwordEncoder.encode(password);
			i++;
		}
		return hashedPassword;
	}

}
