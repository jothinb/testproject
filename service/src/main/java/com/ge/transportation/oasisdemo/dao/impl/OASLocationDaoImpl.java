package com.ge.transportation.oasisdemo.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;

import com.ge.transportation.oasisdemo.dao.OASLocationDao;
import com.ge.transportation.oasisdemo.model.OASLocation;

@Service
public class OASLocationDaoImpl implements OASLocationDao {
	
	private Logger logger = LoggerFactory.getLogger(OASLocationDaoImpl.class);
	
	@Autowired
	JdbcTemplate jdbcTemplate;

	@Override
	public List<OASLocation> findByClass(Integer classNum) {
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();

		String sql = "SELECT * FROM \"OASIS.OAS_LOCATION_DATA\" WHERE CLASS = ? and x_from > 0 and x_to > 0 and Y_from > 0 and y_to > 0";
//		+ "AND STACK > 0 AND SLOTTED=1 and LOT_NAME='CY'";
		List<Map<String,Object>> rows = jdbcTemplate.queryForList(sql, new Object[] {classNum});
		List<OASLocation> locations = new ArrayList<OASLocation>();
		
		for (Map<String,Object> row : rows) {			
			locations.add(populateOASLocation(row));
		}
		stopWatch.stop();
		logger.debug("time spent to run OASLocationDaoImpl::findByClass is " + stopWatch.getLastTaskTimeMillis() + "ms.");
		return locations;

	}

	@Override
	public List<OASLocation> findAll() {		
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		String sql = "SELECT * FROM \"OASIS.OAS_LOCATION_DATA\" where x_from > 0 and x_to > 0 and Y_from > 0 and y_to > 0";
		
		List<Map<String,Object>> rows = jdbcTemplate.queryForList(sql);
		List<OASLocation> locations = new ArrayList<OASLocation>();
		for (Map<String,Object> row : rows) {			
			locations.add(populateOASLocation(row));
		}
		stopWatch.stop();
		logger.debug("time spent to run OASLocationDaoImpl::findAll is " + stopWatch.getLastTaskTimeMillis() + "ms.");
		return locations;
	}

	private OASLocation populateOASLocation(Map<String,Object> row) {
		OASLocation location = new OASLocation();
		location.setAreaName((String) row.get("AREA_NAME"));
		location.setID((String) row.get("ID"));
		location.setLOTAreaIndex((Integer) row.get("LOT_AREA_INDEX"));
		location.setLOTName((String) row.get("LOT_NAME"));
		location.setXFrom((Integer) row.get("X_FROM"));
		location.setXTo((Integer) row.get("X_TO"));
		location.setYFrom((Integer) row.get("Y_FROM"));
		location.setYTo((Integer) row.get("Y_TO"));
		location.setLocationClass((int) row.get("CLASS"));
		
		return location;
	}
}
