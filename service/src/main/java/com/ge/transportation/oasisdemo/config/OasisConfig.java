package com.ge.transportation.oasisdemo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "oasis")
public class OasisConfig {
	private Integer trainLocationY;
	
	private Integer mappingAreaStartY;
	private Integer mappingAreaEndY;
	
	private Integer pickingAreaStartY;
	private Integer pickingAreaEndY;
	
	private Integer pickingGroupStartX;
	private Integer pickingGroupEndX;
	private Integer pickingGroupDistance;
	
	private Integer containerWidth;
	
	private Integer	road1X;
	private Integer	road3X;
	private Integer	road5X;
	private Integer	road7X;
	private Integer	road9X;
	private Integer	road2Y;
	private Integer	road4Y;
	private Integer	road6Y;
	private Integer	road8Y;
	private Integer	road10Y;
	
	private Integer row1Y;
	private Integer row2Y;
	private Integer row3Y;
	private Integer row4Y;
	private Integer row5Y;
	private Integer level1Z;
	private Integer level2Z;
	private Integer level3Z;
	private Integer groupDistance;
	
	private Integer unitMaxLength;
	private Integer storageStartY;
	private Integer storageStartX;
	private Integer storageEndX;
	
	
	public Integer getUnitMaxLength() {
		return unitMaxLength;
	}
	public void setUnitMaxLength(Integer unitMaxLength) {
		this.unitMaxLength = unitMaxLength;
	}
	public Integer getStorageStartX() {
		return storageStartX;
	}
	public void setStorageStartX(Integer storageStartX) {
		this.storageStartX = storageStartX;
	}
	public Integer getStorageEndX() {
		return storageEndX;
	}
	public void setStorageEndX(Integer storageEndX) {
		this.storageEndX = storageEndX;
	}
	public Integer getStorageStartY() {
		return storageStartY;
	}
	public void setStorageStartY(Integer storageStartY) {
		this.storageStartY = storageStartY;
	}
	public Integer getPickingGroupStartX() {
		return pickingGroupStartX;
	}
	public void setPickingGroupStartX(Integer pickingGroupStartX) {
		this.pickingGroupStartX = pickingGroupStartX;
	}
	public Integer getPickingGroupEndX() {
		return pickingGroupEndX;
	}
	public void setPickingGroupEndX(Integer pickingGroupEndX) {
		this.pickingGroupEndX = pickingGroupEndX;
	}
	public Integer getPickingGroupDistance() {
		return pickingGroupDistance;
	}
	public void setPickingGroupDistance(Integer pickingGroupDistance) {
		this.pickingGroupDistance = pickingGroupDistance;
	}
	public Integer getContainerWidth() {
		return containerWidth;
	}
	public void setContainerWidth(Integer containerWidth) {
		this.containerWidth = containerWidth;
	}
	public Integer getMappingAreaStartY() {
		return mappingAreaStartY;
	}
	public void setMappingAreaStartY(Integer mappingAreaStartY) {
		this.mappingAreaStartY = mappingAreaStartY;
	}
	public Integer getMappingAreaEndY() {
		return mappingAreaEndY;
	}
	public void setMappingAreaEndY(Integer mappingAreaEndY) {
		this.mappingAreaEndY = mappingAreaEndY;
	}
	public Integer getPickingAreaStartY() {
		return pickingAreaStartY;
	}
	public void setPickingAreaStartY(Integer pickingAreaStartY) {
		this.pickingAreaStartY = pickingAreaStartY;
	}
	public Integer getPickingAreaEndY() {
		return pickingAreaEndY;
	}
	public void setPickingAreaEndY(Integer pickingAreaEndY) {
		this.pickingAreaEndY = pickingAreaEndY;
	}
	public Integer getRow5Y() {
		return row5Y;
	}
	public void setRow5Y(Integer row5y) {
		row5Y = row5y;
	}
	public Integer getGroupDistance() {
		return groupDistance;
	}
	public void setGroupDistance(Integer groupDistance) {
		this.groupDistance = groupDistance;
	}
	public Integer getRow1Y() {
		return row1Y;
	}
	public void setRow1Y(Integer row1y) {
		row1Y = row1y;
	}
	public Integer getRow2Y() {
		return row2Y;
	}
	public void setRow2Y(Integer row2y) {
		row2Y = row2y;
	}
	public Integer getRow3Y() {
		return row3Y;
	}
	public void setRow3Y(Integer row3y) {
		row3Y = row3y;
	}
	public Integer getRow4Y() {
		return row4Y;
	}
	public void setRow4Y(Integer row4y) {
		row4Y = row4y;
	}
	public Integer getLevel1Z() {
		return level1Z;
	}
	public void setLevel1Z(Integer level1z) {
		level1Z = level1z;
	}
	public Integer getLevel2Z() {
		return level2Z;
	}
	public void setLevel2Z(Integer level2z) {
		level2Z = level2z;
	}
	public Integer getLevel3Z() {
		return level3Z;
	}
	public void setLevel3Z(Integer level3z) {
		level3Z = level3z;
	}
	public Integer getTrainLocationY() {
		return trainLocationY;
	}
	public void setTrainLocationY(Integer trainLocationY) {
		this.trainLocationY = trainLocationY;
	}
	public Integer getRoad1X() {
		return road1X;
	}
	public void setRoad1X(Integer road1x) {
		road1X = road1x;
	}
	public Integer getRoad3X() {
		return road3X;
	}
	public void setRoad3X(Integer road3x) {
		road3X = road3x;
	}
	public Integer getRoad5X() {
		return road5X;
	}
	public void setRoad5X(Integer road5x) {
		road5X = road5x;
	}
	public Integer getRoad7X() {
		return road7X;
	}
	public void setRoad7X(Integer road7x) {
		road7X = road7x;
	}
	public Integer getRoad9X() {
		return road9X;
	}
	public void setRoad9X(Integer road9x) {
		road9X = road9x;
	}
	public Integer getRoad2Y() {
		return road2Y;
	}
	public void setRoad2Y(Integer road2y) {
		road2Y = road2y;
	}
	public Integer getRoad4Y() {
		return road4Y;
	}
	public void setRoad4Y(Integer road4y) {
		road4Y = road4y;
	}
	public Integer getRoad6Y() {
		return road6Y;
	}
	public void setRoad6Y(Integer road6y) {
		road6Y = road6y;
	}
	public Integer getRoad8Y() {
		return road8Y;
	}
	public void setRoad8Y(Integer road8y) {
		road8Y = road8y;
	}
	public Integer getRoad10Y() {
		return road10Y;
	}
	public void setRoad10Y(Integer road10y) {
		road10Y = road10y;
	}
}
