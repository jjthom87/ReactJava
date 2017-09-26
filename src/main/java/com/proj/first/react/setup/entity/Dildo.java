package com.proj.first.react.setup.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "dildos_five")
@Data
public class Dildo {
	@Id
	@GeneratedValue
	private Integer id;

	private Integer size;
	private String name;
	private Integer cost;

}
