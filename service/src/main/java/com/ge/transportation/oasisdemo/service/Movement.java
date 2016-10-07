package com.ge.transportation.oasisdemo.service;

public class Movement {
	private Position position;
	private Rotation rotation;
	
	public Movement() {
		super();
	}
	
	public Movement(Position position, Rotation rotation) {
		this();
		this.position = position;
		this.rotation = rotation;
	}

	public Position getPosition() {
		return position;
	}

	public Rotation getRotation() {
		return rotation;
	}

	public void setPosition(Position position) {
		this.position = position;
	}

	public void setRotation(Rotation rotation) {
		this.rotation = rotation;
	}

	public static class Rotation {
		private float x; // in units of Math.PI
		private float y;
		private float z;
		
		public Rotation() {
			super();
		}
		
		public Rotation(float x, float y, float z) {
			this();
			this.x = x;
			this.y = y;
			this.z = z;
		}

		public float getX() {
			return x;
		}

		public float getY() {
			return y;
		}

		public float getZ() {
			return z;
		}

		public void setX(float x) {
			this.x = x;
		}

		public void setY(float y) {
			this.y = y;
		}

		public void setZ(float z) {
			this.z = z;
		}
		
	}
	
	public static class Position {
		private float x;
		private float y;
		private float z;
		
		public Position() {
			super();
		}
		
		public Position(float x, float y, float z) {
			this();
			this.x = x;
			this.y = y;
			this.z = z;
		}

		public float getX() {
			return x;
		}

		public float getY() {
			return y;
		}

		public float getZ() {
			return z;
		}

		public void setX(float x) {
			this.x = x;
		}

		public void setY(float y) {
			this.y = y;
		}

		public void setZ(float z) {
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

}
