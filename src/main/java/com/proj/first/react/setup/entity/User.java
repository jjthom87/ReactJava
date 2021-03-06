package com.proj.first.react.setup.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Email;
import org.springframework.security.crypto.bcrypt.BCrypt;

import lombok.Data;

@Entity
@Table(name = "users_three")
@Data
public class User {
	@Id
	@GeneratedValue
	private Integer id;

	private String name;

	@Column(unique = true)
	private String username;

	@Email
	private String email;

	private String password;

	private String uid;

	private Boolean verified = false;

	private Boolean loggedIn = false;

	public String hashPassword(String password_plaintext) {
		return BCrypt.hashpw(password_plaintext, BCrypt.gensalt());
	}

	public Boolean checkPassword(String password, String hash) {
		return (BCrypt.checkpw(password, hash));
	}

}
