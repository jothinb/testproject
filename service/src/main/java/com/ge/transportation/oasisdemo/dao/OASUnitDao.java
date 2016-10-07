package com.ge.transportation.oasisdemo.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ge.transportation.oasisdemo.model.OASUnit;

@Component
public interface OASUnitDao {
	List<OASUnit> findAll();
	List<OASUnit> findUnitsByType(String type, String location);
	List<OASUnit> findUnitsByShipper(String shipper);
	List<OASUnit> findUnitsByShipToCust(String shipToCust);
	List<OASUnit> findUnitsByTrainId(Integer trainId);
}
