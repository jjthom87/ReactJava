package com.proj.first.react.setup.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "activities_one")
@Data
public class Activity {
	
	@Id
	@GeneratedValue
	private Integer id;
	
	String activity;
	
	Integer amountOfTime;

}
