package com.ge.transportation.oasisdemo.model;

import java.io.Serializable;

import com.ge.transportation.oasisdemo.service.CranePosition;

public class OASCraneMovement implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String craneId;
	private int xPos;
	private int yPos;

	public OASCraneMovement(String id, int xPos, int yPos) {
		this.craneId = id;
		this.xPos = xPos;
		this.yPos = yPos;
	}

	public String getCraneId() {
		return craneId;
	}

	public void setCraneId(String craneId) {
		this.craneId = craneId;
	}

	public int getxPos() {
		return xPos;
	}

	public void setxPos(int xPos) {
		this.xPos = xPos;
	}

	public int getyPos() {
		return yPos;
	}

	public void setyPos(int yPos) {
		this.yPos = yPos;
	}
	
	@Override
	public String toString() {
		return "craneId:" + this.craneId + " X:" + this.xPos + " Y:" + this.yPos;
		
	}
	
	public String toJson() {
		// {\"craneMovement\": {\"craneId\": \"k1\", \"x\": -580, \"y\": 120}}
		return "{\"craneMovement\":{\"craneId\":\"" + this.craneId + "\", \"x\":" + this.xPos +", \"y\":" + this.yPos + "}}";
	}
}
