package com.ge.transportation.oasisdemo.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;

import com.ge.transportation.oasisdemo.dao.OASCraneDao;
import com.ge.transportation.oasisdemo.model.OASCrane;

@Service
public class OASCraneDaoImpl implements OASCraneDao{
	private Logger logger = LoggerFactory.getLogger(OASCraneDaoImpl.class);
	
	@Autowired
	protected JdbcTemplate jdbcTemplate;
	
	@Override
	public List<OASCrane> findAll() {
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		List<OASCrane> cranes = new ArrayList<OASCrane>();
		try {
			String SQL = "SELECT * FROM \"OASIS.OAS_CRANE_DATA\" WHERE WO_EQUIPMENT_ID like 'K%'";
			cranes = new ArrayList<OASCrane>();
			List<Map<String,Object>>rows = jdbcTemplate.queryForList(SQL);
			for (Map<String,Object>row : rows) {
				OASCrane crane = new OASCrane();
				crane.setWOEquipmentID((String) row.get("WO_EQUIPMENT_ID"));
				crane.setStackNumber((int)row.get("STACK_NUM"));
				crane.setStackOrder((int)row.get("STACK_ORDER"));
				crane.setBeginX((int)row.get("BEGIN_X"));
				crane.setBeginY((int)row.get("BEGIN_Y"));
				crane.setEndX((int)row.get("END_X"));
				crane.setEndY((int)row.get("END_Y"));
				cranes.add(crane);
			}
		} catch (DataAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		stopWatch.stop();
		logger.debug("time spent to run OASCraneDaoImpl::findAll is " + stopWatch.getLastTaskTimeMillis() + "ms.");
		return cranes;
	}
}
