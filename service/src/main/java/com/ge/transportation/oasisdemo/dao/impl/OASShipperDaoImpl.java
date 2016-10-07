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

import com.ge.transportation.oasisdemo.dao.OASShipperDao;
import com.ge.transportation.oasisdemo.model.OASShipper;

@Service
public class OASShipperDaoImpl implements OASShipperDao {
	private Logger logger = LoggerFactory.getLogger(OASShipperDaoImpl.class);
	
	@Autowired
	protected JdbcTemplate jdbcTemplate;
	
	@Override
	public List<OASShipper> findAll() {
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		List<OASShipper> shippers = new ArrayList<OASShipper>();
		try {
			String SQL = "SELECT * FROM \"OASIS.OAS_SHIPPER_DATA\"";
			List<Map<String,Object>>rows = jdbcTemplate.queryForList(SQL);
			for (Map<String,Object>row : rows) {
				OASShipper shipper = new OASShipper();
				shipper.setName((String) row.get("SHPR_NAME"));
				shipper.setCode((String)row.get("SHPR_CODE"));
				shipper.setDescription((String)row.get("SHPR_DESCR"));
				shippers.add(shipper);
			}
		} catch (DataAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		stopWatch.stop();
		logger.debug("time spent to run OASShipperDaoImpl::findAll is " + stopWatch.getLastTaskTimeMillis() + "ms.");
		return shippers;
	}
}
