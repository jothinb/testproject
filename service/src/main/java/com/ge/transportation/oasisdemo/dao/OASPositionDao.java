package com.ge.transportation.oasisdemo.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ge.transportation.oasisdemo.model.OASPosition;

@Component
public interface OASPositionDao {
	List<OASPosition> findAll();
}
