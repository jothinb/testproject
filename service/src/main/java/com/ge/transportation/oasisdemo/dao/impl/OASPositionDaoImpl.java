package com.ge.transportation.oasisdemo.dao.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;

import com.ge.transportation.oasisdemo.dao.OASPositionDao;
import com.ge.transportation.oasisdemo.model.OASPosition;

@Service
public class OASPositionDaoImpl implements OASPositionDao{
	
	private Logger logger = LoggerFactory.getLogger(OASPositionDaoImpl.class);
	
	@Autowired
	protected JdbcTemplate jdbcTemplate;
	
	@Override
	public List<OASPosition> findAll() {
		
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		
		String SQL = "SELECT * FROM \"OASIS.OAS_POSITION\"";
		List<OASPosition> positions = new ArrayList<OASPosition>();
		List<Map<String,Object>>rows = jdbcTemplate.queryForList(SQL);
		for (Map<String,Object>row : rows) {
			OASPosition position = this.populateOASPosition(row);
			positions.add(position);
		}
	
		stopWatch.stop();
		logger.debug("time spent to run OASPositionDaoImpl::findAll is " + stopWatch.getLastTaskTimeMillis() + " ms.");
		return positions;
	}

	private OASPosition populateOASPosition(Map<String,Object>row) {
		OASPosition position = new OASPosition();
		position.setXpos((BigDecimal)row.get("xpos"));
		position.setYpos((BigDecimal)row.get("ypos"));
		position.setZpos((BigDecimal)row.get("zpos"));
		position.setXrot((BigDecimal) row.get("xrot"));
		position.setYrot((BigDecimal) row.get("yrot"));
		position.setZrot((BigDecimal) row.get("zrot"));
		return position;
	}

}
