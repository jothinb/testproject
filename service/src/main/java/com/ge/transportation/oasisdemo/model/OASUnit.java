package com.ge.transportation.oasisdemo.model;

import java.io.Serializable;

public class OASUnit implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer LOTAreaIndex;
	private String shipToCust;
	private String destName;
	private String containerSize;
	private Integer slotNbr;
	private String unitInit;
	private Integer unitNbr;
	private String sizeCode;
	private String shprName;
	private String waybillId;
	private String sealNbr;
	private Integer goalTime;
	private Integer waybillTime;
	private Integer arvlTime;
	private Integer stccCode;
	private String ownType;
	private String poolIdCode;
	private String voyage;
	private String benOwner;
	private String bookingId;
	private String invStatus;
	private String aarCode;
	private Integer wdthNbr;
	private Integer lgthNbr;
	private Integer hgtNbr;
	private Integer wgtNbr;
	private String origName;
	private String trainOrig;
	private String trainBlock;
	private String finlDescName;
	private Integer X;
	private Integer Y;
	private Integer Z;
	private Integer trainId;
	private ContainerType containerType;


	public OASUnit() {
	}

	public OASUnit(String init, Integer unitNbr, Integer LOTAreaIndex, 
			String shipperName, String shipToCust, String sizeCode, String aarCode,
			String origName, String destName, Integer slotNbr,
			Integer X, Integer Y, Integer Z, String containerSize) {
	
		this.unitNbr = unitNbr;
		this.LOTAreaIndex = LOTAreaIndex;
		this.shprName = shipperName;
		this.shipToCust = shipToCust;
		this.sizeCode = sizeCode;
		this.aarCode = aarCode;
		this.origName = origName;
		this.destName = destName;
		this.slotNbr = slotNbr;
		this.X = X;
		this.Y = Y;
		this.Z = Z;
		this.containerSize = containerSize;
	}

	
	public ContainerType getContainerType() {
		return containerType;
	}

	public void setContainerType(ContainerType containerType) {
		this.containerType = containerType;
	}

	public Integer getLOTAreaIndex() {
		return LOTAreaIndex;
	}

	public void setLOTAreaIndex(Integer lOTAreaIndex) {
		LOTAreaIndex = lOTAreaIndex;
	}

	public String getShipToCust() {
		return shipToCust;
	}

	public void setShipToCust(String shipToCust) {
		this.shipToCust = shipToCust;
	}

	public String getDestName() {
		return destName;
	}

	public void setDestName(String destName) {
		this.destName = destName;
	}

	public String getContainerSize() {
		return containerSize;
	}

	public void setContainerSize(String containerSize) {
		this.containerSize = containerSize;
	}

	public Integer getSlotNbr() {
		return slotNbr;
	}

	public void setSlotNbr(Integer slotNbr) {
		this.slotNbr = slotNbr;
	}

	public String getUnitInit() {
		return unitInit;
	}

	public void setUnitInit(String unitInit) {
		this.unitInit = unitInit;
	}

	public Integer getUnitNbr() {
		return unitNbr;
	}

	public void setUnitNbr(Integer unitNbr) {
		this.unitNbr = unitNbr;
	}

	public String getSizeCode() {
		return sizeCode;
	}

	public void setSizeCode(String sizeCode) {
		this.sizeCode = sizeCode;
	}

	public String getShprName() {
		return shprName;
	}

	public void setShprName(String shprName) {
		this.shprName = shprName;
	}
	public String getWaybillId() {
		return waybillId;
	}

	public void setWaybillId(String waybillId) {
		this.waybillId = waybillId;
	}

	public String getSealNbr() {
		return sealNbr;
	}

	public void setSealNbr(String sealNbr) {
		this.sealNbr = sealNbr;
	}

	public Integer getGoalTime() {
		return goalTime;
	}

	public void setGoalTime(Integer goalTime) {
		this.goalTime = goalTime;
	}

	public Integer getWaybillTime() {
		return waybillTime;
	}

	public void setWaybillTime(Integer waybillTime) {
		this.waybillTime = waybillTime;
	}

	public Integer getArvlTime() {
		return arvlTime;
	}

	public void setArvlTime(Integer arvlTime) {
		this.arvlTime = arvlTime;
	}

	public Integer getStccCode() {
		return stccCode;
	}

	public void setStccCode(Integer stccCode) {
		this.stccCode = stccCode;
	}

	public String getOwnType() {
		return ownType;
	}

	public void setOwnType(String ownType) {
		this.ownType = ownType;
	}

	public String getPoolIdCode() {
		return poolIdCode;
	}

	public void setPoolIdCode(String poolIdCode) {
		this.poolIdCode = poolIdCode;
	}

	public String getVoyage() {
		return voyage;
	}

	public void setVoyage(String voyage) {
		this.voyage = voyage;
	}

	public String getBenOwner() {
		return benOwner;
	}

	public void setBenOwner(String benOwner) {
		this.benOwner = benOwner;
	}

	public String getBookingId() {
		return bookingId;
	}

	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
	}

	public String getInvStatus() {
		return invStatus;
	}

	public void setInvStatus(String invStatus) {
		this.invStatus = invStatus;
	}

	public String getAarCode() {
		return aarCode;
	}

	public void setAarCode(String aarCode) {
		this.aarCode = aarCode;
	}

	public Integer getWdthNbr() {
		return wdthNbr;
	}

	public void setWdthNbr(Integer wdthNbr) {
		this.wdthNbr = wdthNbr;
	}

	public Integer getLgthNbr() {
		return lgthNbr;
	}

	public void setLgthNbr(Integer lgthNbr) {
		this.lgthNbr = lgthNbr;
	}

	public Integer getHgtNbr() {
		return hgtNbr;
	}

	public void setHgtNbr(Integer hgtNbr) {
		this.hgtNbr = hgtNbr;
	}

	public Integer getWgtNbr() {
		return wgtNbr;
	}

	public void setWgtNbr(Integer wgtNbr) {
		this.wgtNbr = wgtNbr;
	}

	public String getOrigName() {
		return origName;
	}

	public void setOrigName(String origName) {
		this.origName = origName;
	}

	public String getTrainOrig() {
		return trainOrig;
	}

	public void setTrainOrig(String trainOrig) {
		this.trainOrig = trainOrig;
	}

	public String getTrainBlock() {
		return trainBlock;
	}

	public void setTrainBlock(String trainBlock) {
		this.trainBlock = trainBlock;
	}

	public String getFinlDescName() {
		return finlDescName;
	}

	public void setFinlDescName(String finlDescName) {
		this.finlDescName = finlDescName;
	}

	public Integer getX() {
		return X;
	}

	public void setX(Integer x) {
		X = x;
	}

	public Integer getY() {
		return Y;
	}

	public void setY(Integer y) {
		Y = y;
	}

	public Integer getZ() {
		return Z;
	}

	public void setZ(Integer z) {
		Z = z;
	}
	
	public Integer getTrainId() {
		return trainId;
	}

	public void setTrainId(Integer trainId) {
		this.trainId = trainId;
	}

	@Override
	public String toString() {
		return ("" + this.unitInit + " " + this.unitNbr + " " + this.LOTAreaIndex + " " + this.trainId);
	}
}
