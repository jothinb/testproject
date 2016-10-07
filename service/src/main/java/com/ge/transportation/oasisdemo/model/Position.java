package com.ge.transportation.oasisdemo.model;

import java.io.Serializable;

//@Entity
public class Position implements Serializable{

//	@Id
//    @GeneratedValue
    private Long id;
	
//	@Column(nullable = true)
	private int x;
	
//	@Column(nullable = true)
	private int y;
	
//	@Column(nullable = true)
	private int z;
	
	public Position() {
		super();
	}
	
	public Position(int x, int y, int z) {
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
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + x;
		result = prime * result + y;
		result = prime * result + z;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Position other = (Position) obj;
		if (x != other.x)
			return false;
		if (y != other.y)
			return false;
		if (z != other.z)
			return false;
		return true;
	}
	
}

