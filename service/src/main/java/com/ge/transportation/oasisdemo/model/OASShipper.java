package com.ge.transportation.oasisdemo.model;

import java.io.Serializable;

public class OASShipper implements Serializable {
	private static final long serialVersionUID = 1L;
	private String name;
	private String code;
	private String description;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
