package com.ge.transportation.oasisdemo.service;

public class SimpleMove {
	public enum Direction {
		right, left, forward, back;
	}
	private final Direction direction;
	private final int distance;
	
	public SimpleMove(Direction direction, int distance) {
		this.direction = direction;
		this.distance = distance;
	}

	public Direction getDirection() {
		return direction;
	}

	public int getDistance() {
		return distance;
	}
	
}
