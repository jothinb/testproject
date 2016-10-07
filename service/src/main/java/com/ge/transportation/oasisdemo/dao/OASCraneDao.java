package com.ge.transportation.oasisdemo.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ge.transportation.oasisdemo.model.OASCrane;

@Component
public interface OASCraneDao {
	List <OASCrane> findAll();
}
