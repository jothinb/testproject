package com.ge.transportation.oasisdemo.service;

import java.util.List;

public class CraneMovement {
	private String craneId;
	private List<CranePosition> cranePositions;
	
	public CraneMovement() {}
	
	public CraneMovement(String craneId, List<CranePosition>poslist) {
		this.craneId = craneId;
		this.cranePositions = poslist;
	}
	
	public String getCraneId() {
		return craneId;
	}
	public void setCraneId(String craneId) {
		this.craneId = craneId;
	}
	public List<CranePosition> getCranePositions() {
		return this.cranePositions;
	}
	public void setCranePosition(List<CranePosition> cranePositions) {
		this.cranePositions = cranePositions;
	}
}
