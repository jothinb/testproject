package com.ge.transportation.oasisdemo.service;

public class CranePosition {
	private int x;
	private int y;
	private int z;
	
	public CranePosition() {
		super();
	}
	
	public CranePosition(int x, int y, int z) {
		this();
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}

	public int getZ() {
		return z;
	}

	public void setX(int x) {
		this.x = x;
	}

	public void setY(int y) {
		this.y = y;
	}

	public void setZ(int z) {
		this.z = z;
	}
	
	@Override
	public String toString() {
		return "X:" + this.x + "Y:" + this.y + "Z:" + this.z;
		
	}
	
	public String toJson() {
		return "{\"position\":{\"x\":" + this.x +", \"y\":" + this.y + ", \"z\": " + this.z + "}}";
	}
}
