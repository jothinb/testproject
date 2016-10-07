package com.ge.transportation.oasisdemo.dao.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;

import com.ge.transportation.oasisdemo.config.OasisConfig;
import com.ge.transportation.oasisdemo.dao.OASUnitDao;
import com.ge.transportation.oasisdemo.model.ContainerType;
import com.ge.transportation.oasisdemo.model.OASUnit;

@Service
public class OASUnitDaoImpl implements OASUnitDao {
	private Logger logger = LoggerFactory.getLogger(OASUnitDaoImpl.class);
	
	@Autowired
	private OasisConfig oasisConfig;
	
	/*
	 * the entire mapping area can be devided into picking area, parking area and temporary storage area
	 * by y values.
	 */
	
	@Autowired
	protected JdbcTemplate jdbcTemplate;
	// private static final String FILTER_FIRST_LEVEL = " (z <= 132) ";
	// private static final String FILTER_SECOND_LEVEL = " (z > 159 and z <= 224) ";
	// private static final String FILTER_THIRD_LEVEL = " (z > 248) ";
	private static final String FILTER_CONTAINER_SIZE_NOT_NULL = " CONTAINER_SIZE IS NOT NULL ";
	
	// private static final String FILTER = " and " + FILTER_CONTAINER_SIZE_NOT_NULL;
	
	// disable any filter
	private static final String FILTER = "";
	
	/*
	 * (non-Javadoc)
	 * @see com.ge.transportation.oasisdemo.dao.OASUnitDao#findAll()
	 */
	@Override
	public List<OASUnit> findAll() {
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		
		String SQL = "SELECT * FROM \"OASIS.OAS_UNIT_DATA\" where x > 0 and y > 0 and z > 0";
		SQL = SQL.concat(FILTER);
		List<OASUnit>units = new ArrayList<OASUnit>();
		List<Map<String,Object>>rows = jdbcTemplate.queryForList(SQL);
		for (Map<String,Object>row : rows) {
			OASUnit unit = this.populateOASUnit(row);
			units.add(unit);
		}
		
		stopWatch.stop();
		logger.debug("time spent to run OASUnitDaoImpl::findAll is " + stopWatch.getLastTaskTimeMillis() + "ms.");
		return this.alignByGroup(units);
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.ge.transportation.oasisdemo.dao.OASUnitDao#findUnitsByType(java.lang.String, java.lang.String)
	 */
	@Override
	public List<OASUnit> findUnitsByType(String type, String location) {
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		String sql = "SELECT * FROM \"OASIS.OAS_UNIT_DATA\" WHERE TYPE_IND = ? ";

		if("C".equalsIgnoreCase(type)) {
            if("STACK".equalsIgnoreCase(location)) {
                sql=sql.concat("and (x>0 or y>0 or z>0)");
            } else if("SLOT".equalsIgnoreCase(location)) {
            	sql=sql.concat("and slot_nbr>0 and (x=0 and y=0 and z=0)");
            }
            sql=sql.concat(" AND RAIL_CAR_INIT = ''");
		}
		sql = sql.concat(FILTER);
		
		List<OASUnit>units = new ArrayList<OASUnit>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList(sql, new Object[] {type});	
		for (Map<String,Object>row : rows) {
			OASUnit unit = this.populateOASUnit(row);
			units.add(unit);
		}
		stopWatch.stop();
		logger.debug("time spent to run OASUnitDaoImpl::findUnitsByType is " + stopWatch.getLastTaskTimeMillis() + "ms.");
		return this.alignByGroup(units);
	}

	/*
	 * (non-Javadoc)
	 * @see com.ge.transportation.oasisdemo.dao.OASUnitDao#findUnitsByShipper(java.lang.String)
	 */
	@Override
	public List<OASUnit> findUnitsByShipper(String shipper) {
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		String sql = "SELECT * FROM \"OASIS.OAS_UNIT_DATA\" WHERE x > 0 and y > 0 and z > 0 AND SHPR_NAME = ?";
		sql = sql.concat(FILTER);
		
		List<OASUnit>units = new ArrayList<OASUnit>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList(sql, new Object[] {shipper});	
		for (Map<String,Object>row : rows) {
			OASUnit unit = this.populateOASUnit(row);
			units.add(unit);
		}
		stopWatch.stop();
		logger.debug("time spent to run OASUnitDaoImpl::findUnitsByShipper is " + stopWatch.getLastTaskTimeMillis() + "ms.");
		return this.alignByGroup(units);
	}
	
	@Override
	public List<OASUnit> findUnitsByShipToCust(String shipToCust) {
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		String sql = "SELECT * FROM \"OASIS.OAS_UNIT_DATA\" WHERE x > 0 and y > 0 and z > 0 AND SHIP_TO_CUST = ?";
		sql = sql.concat(FILTER);
		List<OASUnit>units = new ArrayList<OASUnit>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList(sql, new Object[] {shipToCust});	
		for (Map<String,Object>row : rows) {
			OASUnit unit = this.populateOASUnit(row);
			units.add(unit);
		}
		stopWatch.stop();

		logger.debug("time spent to run OASUnitDaoImpl::findUnitsByShipToCust is " + stopWatch.getLastTaskTimeMillis() + "ms.");
		return this.alignByGroup(units);
	}
	
	@Override
	public List<OASUnit> findUnitsByTrainId(Integer trainId) {
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		String sql = "SELECT * FROM \"OASIS.OAS_UNIT_DATA\" WHERE x > 0 and y > 0 and z > 0 AND TRAIN_ID = ?";
		sql = sql.concat(FILTER);
		List<OASUnit>units = new ArrayList<OASUnit>();
		List<Map<String,Object>> rows = jdbcTemplate.queryForList(sql, new Object[] {trainId});	
		for (Map<String,Object>row : rows) {
			OASUnit unit = this.populateOASUnit(row);
			units.add(unit);
		}
		stopWatch.stop();

		logger.debug("time spent to run OASUnitDaoImpl::findUnitsByTrainId is " + stopWatch.getLastTaskTimeMillis() + "ms.");
		return this.alignByGroup(units);
	}
	
	private List<OASUnit> alignByGroup(List<OASUnit> list) {
		
		// normalize x values for containers in two areas, the parking area and the temp storage area.
		List<OASUnit> normalizedList = this.normalizeX(list, oasisConfig.getPickingAreaStartY(), oasisConfig.getPickingAreaEndY());
		normalizedList = this.assignPickingGroup(list, oasisConfig.getPickingAreaStartY(), oasisConfig.getPickingAreaEndY());
		// normalizedList = this.normalizeX(normalizedList, oasisConfig.getStorageStartY(), oasisConfig.getMappingAreaEndY());
		// normalizedList = this.normalizeY(normalizedList, oasisConfig.getStorageStartY(), oasisConfig.getMappingAreaEndY());
		normalizedList = this.groupContainersInStorageArea(normalizedList);
		
		// this call has to be the last step
		normalizedList = this.setContainerType(normalizedList);
		
		return normalizedList;
	}
	
	
	private List<OASUnit>convertMapToList(Map<Integer, OASUnit>unitMap) {
		List<OASUnit>unitList = new ArrayList<OASUnit>();
		Set<Integer>keySet = unitMap.keySet();
		Iterator<Integer>keyItor = keySet.iterator();
		while (keyItor.hasNext()) {
			Integer key = (Integer)keyItor.next();
			OASUnit unit = unitMap.get(key);
			unitList.add(unit);
		}
		return unitList;
	}
	
	private List<OASUnit> groupContainersInStorageArea(List<OASUnit>list) {
		final Integer maxStack = 3;
		final Integer maxRow = 4;
		final Integer maxColumn = 22;
		
		Integer startY = oasisConfig.getStorageStartY();
		Integer endY = oasisConfig.getMappingAreaEndY();
		Integer startX = oasisConfig.getStorageStartX();
		Integer endX = oasisConfig.getStorageEndX();
		Integer unitMaxLength = oasisConfig.getUnitMaxLength();
		
		Integer xOffset = 1000 * 8;
		Integer yOffset = -13500;
		
		int xIndex = 0;
		int yIndex = 0;
		int zIndex = 0;
		
		Iterator <OASUnit>itor = list.iterator();
		while (itor.hasNext()) {
			OASUnit unit = (OASUnit)itor.next();
			if (unit.getY() < startY || unit.getY() > endY) continue;
			if (xIndex > maxColumn) {
				yIndex++;
				xIndex = 0;
				zIndex = 0;
			}
			if (zIndex > maxStack) {
				xIndex++;
				zIndex = 0;
			}
			
			unit.setY(endY -(yIndex * 100) - yOffset);
			unit.setX(startX + (xIndex * unitMaxLength) + xOffset);
			unit.setZ(zIndex * 10);
			unit.setContainerSize("2.000000000");
			zIndex++;
		}
		return list;
	}
	
	private List<OASUnit> normalizeY(List<OASUnit> units, Integer startY, Integer endY) {
		if (units == null || units.size() == 0) return units;
		
		Map<Integer, OASUnit>unitMap = this.buildNbrMap(units);
		int unitCount = this.countContainerInArea(units, startY, endY);
		
		// build an index from unit y value to unit number
		Integer[][]unitYIndex = new Integer[unitCount][2];
		int currentUnit = 0;
		Iterator<OASUnit>itor = units.iterator();
		while (itor.hasNext()) {
			OASUnit unit = (OASUnit)itor.next();
			if (unit.getY() >= startY && unit.getY() <= endY) {
				unitYIndex[currentUnit][0] = unit.getY();
				unitYIndex[currentUnit][1] = unit.getUnitNbr();
				currentUnit++;
			}
		}
		
		// sort index by y value
		Arrays.sort(unitYIndex, new Comparator<Integer[]>() {
			@Override
			public int compare(Integer[] intOne, Integer[] intTwo) {
				return intOne[0].compareTo(intTwo[0]);
			}
		});
		
		int containerWidth = oasisConfig.getContainerWidth();
		Integer groupStart = null;
		
		for (int i = 0; i < unitYIndex.length; i++) {
			// logger.debug("x : " + unitIndex[i][0] + " nbr : " + unitIndex[i][1]);
			
			// set group start point
			if (groupStart == null) {
				groupStart = unitYIndex[i][0];
			}
			else {
				if (unitYIndex[i][0] - groupStart > containerWidth) {
					groupStart = unitYIndex[i][0];
				}
			}
			
			// normalize the x value in one group
			if (unitYIndex[i][0] > groupStart) {
				unitMap.get(unitYIndex[i][1]).setY(groupStart);
			}
		}
		
		return this.convertMapToList(unitMap);
	}
	
	private List<OASUnit> assignPickingGroup (List<OASUnit> units, Integer startY, Integer endY) {
		if (units == null || units.size() == 0) return units;
		
		// x values range from 0 to 80000
		// group id range from 0 to 79
		Integer groupMaxId = 160;
		Integer groupDistance = oasisConfig.getPickingGroupDistance()/2;
		
		Iterator<OASUnit>itor = units.iterator();
		while (itor.hasNext()) {
			OASUnit unit = (OASUnit)itor.next();
			// skip containers outside of picking area
			if (unit.getY() < startY || unit.getY() > endY) continue;
			
			int groupId = (unit.getX() / groupDistance);
			groupId = groupMaxId - groupId;
			unit.setSlotNbr(groupId);
		}
		return units;
	}
	
	/*
	 * line up containers in an area by normalizing x values.
	 */
	private List<OASUnit> normalizeX(List<OASUnit> units, Integer startY, Integer endY) {
		if (units == null || units.size() == 0) return units;
		
		Map<Integer, OASUnit>unitMap = this.buildNbrMap(units);
		
		int unitCount = this.countContainerInArea(units, startY, endY);

		// build an index from unit x value to unit number
		Integer[][]unitXIndex = new Integer[unitCount][2];
		int currentUnit = 0;
		Iterator<OASUnit>itor = units.iterator();
		while (itor.hasNext()) {
			OASUnit unit = (OASUnit)itor.next();
			if (unit.getY() >= startY && unit.getY() <= endY) {
				unitXIndex[currentUnit][0] = unit.getX();
				unitXIndex[currentUnit][1] = unit.getUnitNbr();
				currentUnit++;
			}
		}
		
		// sort index by x value
		Arrays.sort(unitXIndex, new Comparator<Integer[]>() {
			@Override
			public int compare(Integer[] intOne, Integer[] intTwo) {
				return intOne[0].compareTo(intTwo[0]);
			}
		});
		
		/*
		 * adjust the distance value to make sure the correct grouping.
		 * If the distance value is too large, containers 
		 * from different groups can be smashed into one group.
		 * If the distance value is too small, the normalization of the x value
		 * will not happen.
		 * We need to find out the right distance value;
		 */
		int distance = oasisConfig.getGroupDistance();
		Integer groupStart = null;
		
		for (int i = 0; i < unitXIndex.length; i++) {
			// logger.debug("x : " + unitIndex[i][0] + " nbr : " + unitIndex[i][1]);
			
			// set group start point
			if (groupStart == null) {
				groupStart = unitXIndex[i][0];
			}
			else {
				if (unitXIndex[i][0] - groupStart > distance) {
					groupStart = unitXIndex[i][0];
				}
			}
			
			// normalize the x value in one group
			if (unitXIndex[i][0] > groupStart) {
				unitMap.get(unitXIndex[i][1]).setX(groupStart);
			}
		}
		
		List<OASUnit>normalizedList = this.convertMapToList(unitMap);
		logger.debug("Total containers in normalized list : " + normalizedList.size());
		return normalizedList;
	}
	
	/*
	 * normalized rows' y values in the picking area
	 */
	private OASUnit normalizeRow (OASUnit unit) {
		Integer yVal = unit.getY();
		if (yVal >= 2242 && yVal <=2261) unit.setY(oasisConfig.getRow1Y());
		if (yVal >= 2333 && yVal <=2382) unit.setY(oasisConfig.getRow2Y());
		if (yVal >= 2421 && yVal <=2446) unit.setY(oasisConfig.getRow3Y());
		if (yVal >= 2511 && yVal <=2537) unit.setY(oasisConfig.getRow4Y());
		if (yVal >= 3289 && yVal <=3314) unit.setY(oasisConfig.getRow5Y());
		
		return unit;
	}
	
	/*
	 * build an container NBR to container map.
	 */
	private Map<Integer,OASUnit> buildNbrMap(List<OASUnit>units) {
		
		Map<Integer, OASUnit>nbrMap = new HashMap<Integer, OASUnit>();
		Iterator<OASUnit>itor = units.iterator();
		int unitCount = 0;
		while (itor.hasNext()) {
			OASUnit unit = (OASUnit)itor.next();
			nbrMap.put(unit.getUnitNbr(), unit);
		}
		return nbrMap;
	}
	
	/*
	 * count number of containers in an area divided by starting Y and ending Y values.
	 */
	private Integer countContainerInArea(List<OASUnit> units, Integer startY, Integer endY) {
		Iterator<OASUnit>itor = units.iterator();
		int unitCount = 0;
		while (itor.hasNext()) {
			OASUnit unit = (OASUnit)itor.next();
			if (unit.getY() >= startY && unit.getY() <= endY) {
				unitCount++;
			}
		}
		return unitCount;
	}
	
	/*
	 * if x, y values are available but container_size is null, 
	 * set container_size to the smallest size which is 1.
	 */
	private OASUnit checkContainerSize (OASUnit unit) {
		if (unit.getContainerSize() == null || unit.getContainerSize().length() == 0) {
			if (unit.getX() > 0 && unit.getY() > 0 && unit.getZ() >= 0) {
				unit.setContainerSize("1.000000000");
			}
		}
		return unit;
	}
	
	/*
	 * normalized z values for stack levels.
	 */
	private OASUnit normalizeLevel (OASUnit unit) {
		Integer zVal = unit.getZ();
		if (zVal == null) unit.setZ(oasisConfig.getLevel1Z());
		else if (zVal <= 132) unit.setZ(oasisConfig.getLevel1Z());
		else if (zVal >= 159 && zVal <= 224) unit.setZ(oasisConfig.getLevel2Z());
		else if (zVal >= 248) unit.setZ(oasisConfig.getLevel3Z());
		return unit;
	}
	
	/*
	 * this method should be the last call before the container list is sent to client
	 * due to the x and y changes.
	 */
	private List<OASUnit> setContainerType(List<OASUnit> units) {
		Iterator<OASUnit>itor = units.iterator();
		while (itor.hasNext()) {
			OASUnit unit = (OASUnit)itor.next();
			if (unit.getY() >= oasisConfig.getStorageStartY() && unit.getY() <= oasisConfig.getMappingAreaEndY()) {
				unit.setContainerType(ContainerType.STORAGE);
			}
			else if (unit.getY() >= oasisConfig.getPickingAreaStartY() && unit.getY() <= oasisConfig.getPickingAreaEndY()) {
				unit.setContainerType(ContainerType.PICKING);
			}
			else if (unit.getY() >= 80 && unit.getY() <= 80) {
				unit.setContainerType(ContainerType.TRAIN);
			}
			else if (unit.getX() == 0 && unit.getY() == 0) {
				unit.setContainerType(ContainerType.PARKING);
			}
			
			// parking area x and y are calculaed from DataAccessController.
			// The X and Y are not available at this time.
			// else if (unit.getY() >= 4696 && unit.getY() <= 7150) {
			// 	unit.setContainerType(ContainerType.PARKING);
			// }
		}
		return units;
	}
	
	
	private OASUnit populateOASUnit(Map<String,Object>row) {
		OASUnit unit = new OASUnit();
		unit.setAarCode((String)row.get("AAR_CODE"));
		unit.setContainerSize((String)row.get("CONTAINER_SIZE"));
		unit.setDestName((String)row.get("DEST_NAME"));
		unit.setLOTAreaIndex((int)row.get("LOT_AREA_INDX"));
		unit.setUnitNbr((int)row.get("UNIT_NBR"));
		unit.setOrigName((String)row.get("ORIG_NAME"));
		unit.setShprName((String)row.get("SHPR_NAME"));
		unit.setShipToCust((String)row.get("SHIP_TO_CUST"));
		unit.setSizeCode((String)row.get("SIZE_CODE"));		
		unit.setX((int)row.get("X"));
		unit.setY((int)row.get("Y"));
		unit.setZ((int)row.get("Z"));
		unit.setSlotNbr((int)row.get("SLOT_NBR"));
		unit.setUnitInit((String)row.get("UNIT_INIT"));
		unit.setWaybillId((String)row.get("WAYBILL_ID"));
		unit.setSealNbr((String)row.get("SEAL_NBR"));
		unit.setGoalTime((int)row.get("GOAL_TIME"));
		unit.setWaybillTime((int)row.get("WAYBILL_TIME"));
		unit.setArvlTime((int)row.get("ARVL_TIME"));
		unit.setStccCode((int)row.get("STCC_CODE"));
		unit.setOwnType((String)row.get("OWN_TYPE"));
		unit.setPoolIdCode((String)row.get("POOL_ID_CODE"));
		unit.setVoyage((String)row.get("VOYAGE"));
		unit.setBenOwner((String)row.get("BEN_OWNER"));
		unit.setBookingId((String)row.get("BOOKING_ID"));
		unit.setInvStatus((String)row.get("INV_STATUS"));
		unit.setWdthNbr((Integer)row.get("WDTH_NBR"));
		unit.setLgthNbr((Integer)row.get("LGTH_NBR"));
		unit.setHgtNbr((Integer)row.get("HGT_NBR"));
		unit.setWgtNbr((Integer)row.get("WGT_NBR"));
		unit.setOrigName((String)row.get("ORIG_NAME"));
		unit.setTrainOrig((String)row.get("TRAIN_ORIG"));
		unit.setTrainBlock((String)row.get("TRAIN_BLOCK"));
		unit.setFinlDescName((String)row.get("FINL_DESC_NAME"));
		unit.setTrainId((Integer)row.get("TRAIN_ID"));
		unit = this.checkContainerSize(unit);
		unit = this.normalizeLevel(unit);
		unit = this.normalizeRow(unit);
		
		return unit;
	}
}
