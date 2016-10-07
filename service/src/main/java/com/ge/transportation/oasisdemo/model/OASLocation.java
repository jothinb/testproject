package com.ge.transportation.oasisdemo.model;

import java.io.Serializable;

public class OASLocation implements Serializable {
	private static final long serialVersionUID = 1L;
	private String ID;
	private Integer LOTAreaIndex;
	private String LOTName;
	private String areaName;
	private Integer XFrom;
	private Integer XTo;
	private Integer YFrom;
	private Integer YTo;
	private Integer locationClass;
	
	public OASLocation() {}
	
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public Integer getLOTAreaIndex() {
		return LOTAreaIndex;
	}
	public void setLOTAreaIndex(Integer lOTAreaIndex) {
		LOTAreaIndex = lOTAreaIndex;
	}
	public String getLOTName() {
		return LOTName;
	}
	public void setLOTName(String lOTName) {
		LOTName = lOTName;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public Integer getXFrom() {
		return XFrom;
	}
	public void setXFrom(Integer xFrom) {
		XFrom = xFrom;
	}
	public Integer getXTo() {
		return XTo;
	}
	public void setXTo(Integer xTo) {
		XTo = xTo;
	}
	public Integer getYFrom() {
		return YFrom;
	}
	public void setYFrom(Integer yFrom) {
		YFrom = yFrom;
	}
	public Integer getYTo() {
		return YTo;
	}
	public void setYTo(Integer yTo) {
		YTo = yTo;
	}
	public Integer getLocationClass() {
		return locationClass;
	}

	public void setLocationClass(Integer locationClass) {
		this.locationClass = locationClass;
	}

	@Override
	public String toString() {
		return (this.ID + " " + this.LOTAreaIndex + " " + this.LOTName);
	}


}
