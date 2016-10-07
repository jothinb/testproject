package com.ge.transportation.oasisdemo.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ge.transportation.oasisdemo.model.OASCraneMovement;
import com.ge.transportation.oasisdemo.service.CranePosition;

@Component
public interface OASCraneMovementDao {
	List <OASCraneMovement> findAll();
	OASCraneMovement saveUpdate(OASCraneMovement craneMovement);
}
