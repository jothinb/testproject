package com.ge.transportation.oasisdemo.model;

import java.io.Serializable;
import java.math.BigDecimal;

public class OASPosition implements Serializable {

	private static final long serialVersionUID = -7520482302802454912L;
	
	private BigDecimal xpos;
	private BigDecimal ypos;
	private BigDecimal zpos;
	private BigDecimal xrot;
	private BigDecimal yrot;
	private BigDecimal zrot;
	
	public OASPosition(BigDecimal xpos, BigDecimal ypos, BigDecimal zpos, BigDecimal xrot, BigDecimal yrot, BigDecimal zrot) {
		this.xpos = xpos;
		this.ypos = ypos;
		this.zpos = zpos;
		this.xrot = xrot;
		this.yrot = yrot;
		this.zrot = zrot;
	}
	
	public OASPosition() {}
	
	public BigDecimal getXpos() {
		return xpos;
	}
	public void setXpos(BigDecimal xpos) {
		this.xpos = xpos;
	}
	public BigDecimal getYpos() {
		return ypos;
	}
	public void setYpos(BigDecimal ypos) {
		this.ypos = ypos;
	}
	public BigDecimal getZpos() {
		return zpos;
	}
	public void setZpos(BigDecimal zpos) {
		this.zpos = zpos;
	}
	public BigDecimal getXrot() {
		return xrot;
	}
	public void setXrot(BigDecimal xrot) {
		this.xrot = xrot;
	}
	public BigDecimal getYrot() {
		return yrot;
	}
	public void setYrot(BigDecimal yrot) {
		this.yrot = yrot;
	}
	public BigDecimal getZrot() {
		return zrot;
	}
	public void setZrot(BigDecimal zrot) {
		this.zrot = zrot;
	}
	
	

}
