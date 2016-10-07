package com.ge.transportation.oasisdemo.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ge.transportation.oasisdemo.model.OASShipper;

@Component
public interface OASShipperDao {
	List<OASShipper> findAll();
}
