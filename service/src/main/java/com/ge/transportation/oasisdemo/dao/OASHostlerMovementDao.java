package com.ge.transportation.oasisdemo.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ge.transportation.oasisdemo.model.OASHostlerMovement;

@Component
public interface OASHostlerMovementDao {
	List <OASHostlerMovement> findAll();
	OASHostlerMovement saveUpdate(OASHostlerMovement hostlerMovement);
}
