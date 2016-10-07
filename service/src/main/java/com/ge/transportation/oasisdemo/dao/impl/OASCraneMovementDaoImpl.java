package com.ge.transportation.oasisdemo.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StopWatch;

import com.ge.transportation.oasisdemo.dao.OASCraneMovementDao;
import com.ge.transportation.oasisdemo.model.OASCraneMovement;

@Service
public class OASCraneMovementDaoImpl implements OASCraneMovementDao {
	private Logger logger = LoggerFactory.getLogger(OASCraneMovementDaoImpl.class);
	
	@Autowired
	protected JdbcTemplate jdbcTemplate;
	
	@Override
	public List<OASCraneMovement> findAll() {
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();

		String SQL = "SELECT * FROM \"OASIS.OAS_CRANE_MOVEMENT\"";
		List<Map<String,Object>> rows = jdbcTemplate.queryForList(SQL);
		List<OASCraneMovement>movementList = new ArrayList<OASCraneMovement>();
		for (Map<String,Object> row : rows) {
			OASCraneMovement pos = populate(row);
			movementList.add(pos);
		}
		
		stopWatch.stop();
		logger.debug("time spent to run OASCraneMovementDaoImpl::findAll is " + stopWatch.getLastTaskTimeMillis() + " ms.");
		logger.debug("movementList size : " + movementList.size());
		return movementList;
	}
	
	@Override
	@Transactional
	public OASCraneMovement saveUpdate(OASCraneMovement craneMovement) {
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		
		String craneId = craneMovement.getCraneId();
		int posX = craneMovement.getxPos();
		int posY = craneMovement.getyPos();
		// logger.info("posX : " + posX + " posY : " + posY);
		String SQL_DELETE = "DELETE FROM \"OASIS.OAS_CRANE_MOVEMENT\" WHERE ID = ?";
		String SQL_SAVE = "INSERT INTO \"OASIS.OAS_CRANE_MOVEMENT\" VALUES(?,?,?)";
		Connection connection = null;
		try {
			connection = jdbcTemplate.getDataSource().getConnection();
			PreparedStatement deleteStatement = connection.prepareStatement(SQL_DELETE);
			deleteStatement.setString(1, craneId);
			deleteStatement.execute();
			
			PreparedStatement saveStatement = connection.prepareStatement(SQL_SAVE);
			saveStatement.setString(1, craneId);
			saveStatement.setInt(2, posX);
			saveStatement.setInt(3,  posY);
			saveStatement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException("SaveUpdate to cranteMovement table failed!");
		} finally {
			try {
				if (connection != null && connection.isClosed() == false) {
					connection.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException ("Close connection failed!");
			}
		}
		
		stopWatch.stop();
//		logger.debug("time spent to run OASCraneMovementDaoImpl::saveUpdagte is " + stopWatch.getLastTaskTimeMillis() + " ms.");
		return craneMovement;
	}
	
	private OASCraneMovement populate(Map<String, Object>row) {
		String craneId = (String)row.get("ID");
		int currentX = (int)row.get("CURRENT_X");
		int currentY = (int)row.get("CURRENT_Y");
		return new OASCraneMovement(craneId, currentX, currentY);
	}

}
