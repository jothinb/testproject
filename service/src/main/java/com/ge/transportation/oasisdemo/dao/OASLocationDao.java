package com.ge.transportation.oasisdemo.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ge.transportation.oasisdemo.model.OASLocation;

@Component
public interface OASLocationDao {
	List<OASLocation> findByClass(Integer classNum);
	List<OASLocation> findAll();
}
