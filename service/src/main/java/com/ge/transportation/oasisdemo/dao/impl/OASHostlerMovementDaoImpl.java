package com.ge.transportation.oasisdemo.dao.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;

import com.ge.transportation.oasisdemo.dao.OASHostlerMovementDao;
import com.ge.transportation.oasisdemo.model.OASHostlerMovement;

@Service
public class OASHostlerMovementDaoImpl implements OASHostlerMovementDao {
	private Logger logger = LoggerFactory.getLogger(OASHostlerMovementDaoImpl.class);
	
	@Autowired
	protected JdbcTemplate jdbcTemplate;
	@Override
	public List<OASHostlerMovement> findAll() {
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();

		stopWatch.stop();
		logger.debug("time spent to run OASHostlerMovementDaoImpl::findAll is " + stopWatch.getLastTaskTimeMillis() + "ms.");
		return null;
	}
	
	@Override
	public OASHostlerMovement saveUpdate(OASHostlerMovement hostlerMovement) {
		// TODO Auto-generated method stub
		return null;
	}

}
