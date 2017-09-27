package com.proj.first.react.setup.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
	@Id
	@GeneratedValue
	private Integer id;

	private String firstName;
	private String lastName;
	private String userName;
	private String password;

}
