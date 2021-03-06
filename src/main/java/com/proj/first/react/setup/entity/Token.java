package com.proj.first.react.setup.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "token_two")
@Data
public class Token {

	@Id
	@GeneratedValue
	private Integer id;

	private String token;

	@Column(unique = true)
	private Integer userId;

	private Boolean expired = false;
}
