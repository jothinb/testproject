package com.ge.transportation.oasisdemo.model;

import java.io.Serializable;

public class OASCrane implements Serializable { 
	private static final long serialVersionUID = 1L;
	private String WOEquipmentID;
	private Integer stackNumber;
	private Integer stackOrder;
	private Integer beginX;
	private Integer beginY;
	private Integer endX;
	private Integer endY;
	
	public OASCrane() {}
	
	public String getWOEquipmentID() {
		return WOEquipmentID;
	}
	public void setWOEquipmentID(String wOEquipmentID) {
		WOEquipmentID = wOEquipmentID;
	}
	public Integer getStackNumber() {
		return stackNumber;
	}
	public void setStackNumber(Integer stackNumber) {
		this.stackNumber = stackNumber;
	}
	public Integer getStackOrder() {
		return stackOrder;
	}
	public void setStackOrder(Integer stackOrder) {
		this.stackOrder = stackOrder;
	}
	public Integer getBeginX() {
		return beginX;
	}
	public void setBeginX(Integer beginX) {
		this.beginX = beginX;
	}
	public Integer getBeginY() {
		return beginY;
	}
	public void setBeginY(Integer beginY) {
		this.beginY = beginY;
	}
	public Integer getEndX() {
		return endX;
	}
	public void setEndX(Integer endX) {
		this.endX = endX;
	}
	public Integer getEndY() {
		return endY;
	}
	public void setEndY(Integer endY) {
		this.endY = endY;
	}
	
	@Override
	public String toString() {
		return (this.WOEquipmentID + " " + this.beginX + " " + this.beginY + " " + this.endX + " " + this.endY);
	}

}
