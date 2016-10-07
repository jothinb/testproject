package com.ge.transportation.oasisdemo.service.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.ge.transportation.oasisdemo.model.OASUnit;
import com.ge.transportation.oasisdemo.model.Position;

public final class ContainerUtil {
	
	/* 
	 * upper left connor of the entire mapping area
	 */
	private static final int xStartPosition = 1403; // SELECT min(x) FROM oasis.oas_unit_data where x > 0;
	private static final int yStartPosition = 2242; // SELECT min(y) FROM oasis.oas_unit_data where y > 0; this query returns 160 !!
	private static final int zStartPosition = 0;   	// SELECT min(z) FROM oasis.oas_unit_data where z > 0; this query returns 71 !!
	private static final Position startPosition = new Position(xStartPosition, yStartPosition, zStartPosition);
	
	/*
	 * lower right connor of the entire mapping area
	 */
	private static final int xEndPosition = 79307; 	// SELECT max(x) FROM oasis.oas_unit_data where x > 0;
	private static final int yEndPosition = 12059; 	// SELECT max(y) FROM oasis.oas_unit_data where y > 0;
	private static final int zEndPosition = 0;    	// SELECT max(z) FROM oasis.oas_unit_data where z > 0; this query returns 310 !!
	private static final Position endPosition = new Position(xEndPosition, yEndPosition, zEndPosition);
	
	
	/*
	 * Number of slots per row in each parking area. 
	 * This number multiplies by 3 is the total number of slots in that parking area.
	 * There are three rows in each parking area.
	 */
	private static final int slotsPerRowA = 134;
	private static final int slotsPerRowB = 112;
	private static final int slotsPerRowC = 159;
	private static final int slotsPerRowD = 184;
	
	/*
	 * starting slot number for each parking area.
	 * 
	 * the following sql show hom many containers are assigned to that parking area.
	 * 
	 * select count(*) from `oasis.oas_unit_data` where SLOT_NBR >= 1001 and SLOT_NBR <2001; (751)
	 * select count(*) from `oasis.oas_unit_data` where SLOT_NBR >= 2001 and SLOT_NBR < 3001; (539)
	 * select count(*) from `oasis.oas_unit_data` where SLOT_NBR >= 3001 and SLOT_NBR < 4001; (390)
	 * select count(*) from `oasis.oas_unit_data` where SLOT_NBR >= 4001; (679)
	 */
	private static final int startSlotNumbA = 1001;
	// private static final int startSlotNumbB = 2001;
	private static final int startSlotNumbB = 2160;
	// private static final int startSlotNumbC = 3001;
	private static final int startSlotNumbC = 3160;
	private static final int startSlotNumbD = 4001;
	
	private static final float parkingAreaDimensionRatio = .25f;
	private static final int roadNum = 3;
	private static final int roadWidth = 2550;
		
	private static Properties yardProp = new Properties();
	
	static {
		InputStream is = null;
		try {
			is = ContainerUtil.class.getClassLoader().getResourceAsStream("yard.properties");
			yardProp.load(is);
			if (is != null) is.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		yardProp.list(System.out);
	}
	
	
	/*
	 * return container data with generated coordinates for position(x,y,z).
	 * in parking area, the container z value will always be 0 (on the ground).
	 */
	public static List<OASUnit> generateContainerPosition(List<OASUnit> containers) {
		
		/*
		 * In database, each container in parking area has slot number assigned.
		 * create a slot-number-to-container map. this map is used for assigning container 
		 * to parking area.
		 */
		Map<Integer, OASUnit> slotNbrToContainerMap = new HashMap<>();
		for(OASUnit container : containers) {
			slotNbrToContainerMap.put(container.getSlotNbr(), container);
		}
		
		List<Integer> slotsPerRowList = getSlotsPerRowList(slotsPerRowA, slotsPerRowB, slotsPerRowC, slotsPerRowD);

		
		Map<Integer, Position> parkingAreaStartPositionMap = getParkingAreaStartPositionMapFromConfig();
		
		/*
		 * ending position for each parking area is kept in this map
		 */
		Map<Integer, Position> parkingAreaEndPositionMap = getParkingAreaEndPositionMapFromConfig();
		
		/*
		 * need to know the starting slot number for each parking area.
		 */
		Map<Integer, Integer> startSlotNumbMap = getStartSlotsNumbMap();
		
		/*
		 * calculate slot position and create slot-number-to-position map
		 */
		Map<Integer, Position> slotPositionMap = getSlotPositionMap(slotsPerRowList, parkingAreaStartPositionMap, parkingAreaEndPositionMap, startSlotNumbMap);
		
		/* 
		 * assign container to a slot.
		 */
		List<OASUnit> posContainers = assignContainerToSlot(slotPositionMap, slotNbrToContainerMap);
			
		return posContainers;
	}
	
	/*
	 * use slot number as key to assign container to slot
	 */
	private static List<OASUnit> assignContainerToSlot(Map<Integer, Position> slotPositionMap, Map<Integer, OASUnit> slotNbrToContainerMap) {
		List<OASUnit> posContainers = new ArrayList<>();
		
		for (Map.Entry<Integer, OASUnit> entry : slotNbrToContainerMap.entrySet()) {
			if(entry != null) {
				Position position = slotPositionMap.get(entry.getKey());
				if(position != null) {
					OASUnit container = entry.getValue();
					container.setX(position.getX());
					container.setY(position.getY());
					container.setZ(position.getZ());
					posContainers.add(container);
				}
			}
		}
		return posContainers;
	}

	public static Map<Integer, Position> getSlotPositionMap(
			List<Integer> slotPerRowList,
			Map<Integer, Position> parkingAreaStartPositionMap,
			Map<Integer, Position> parkingAreaEndPositionMap, 
			Map<Integer, Integer> startSlotNumbMap) {
		
		Map<Integer, Position> slotPositionMap = new HashMap<>();
		int inLoop = 0;
		int i=1;
		for(Integer slotsPerRow : slotPerRowList) {
			Integer startSlot = startSlotNumbMap.get(i);
			Position parkingAreaStartPosition = parkingAreaStartPositionMap.get(i);
			Integer parkingAreaStartPositionX = parkingAreaStartPosition.getX();
			Integer parkingAreaStartPositionY = parkingAreaStartPosition.getY();
			Position parkingAreaEndPosition = parkingAreaEndPositionMap.get(i);
			Integer parkingAreaEndPositionX = parkingAreaEndPosition.getX();
			Integer parkingAreaEndPositionY = parkingAreaEndPosition.getY();
			Integer xWidth=getWidth(parkingAreaEndPositionX,parkingAreaStartPositionX);
			Integer yWidth=getWidth(parkingAreaEndPositionY,parkingAreaStartPositionY);
			for(int k=0; k<roadNum; k++) {
				Integer yOffSet = Math.round(k*((float)yWidth/(float)roadNum));
				for(int j=0; j<slotsPerRow; j++) {
					Integer x = parkingAreaStartPositionX + Math.round(j*((float)xWidth/(float)slotsPerRow));
					Integer y = parkingAreaStartPositionY + yOffSet;					
					Position position = new Position(x,y,zStartPosition);				
					slotPositionMap.put(startSlot+inLoop,position);
					inLoop++;	
				}
			}
			inLoop=0;
			i++;
		}
		return slotPositionMap;
	}
	
	/*
	 * return start position of the parking lot: upper left corner
	 */
	public static Position getParkingLotStartPosition(Position startPosition, Position endPosition, float ratio) {
		Integer yPosition = calculatePosition(ratio, startPosition.getY(), endPosition.getY(), startPosition.getY());
		Position parkingLotStartPosition = new Position(startPosition.getX(), yPosition, startPosition.getZ());	
	    return parkingLotStartPosition;
	}
	
	/*
	 * return end position of the parking lot: lower right corner
	 */
	public static Position getParkingLotEndPosition(Position startPosition, Position endPosition, float ratio) {
		Position parkingLotStartPosition = getParkingLotStartPosition(startPosition, endPosition, ratio);
		Integer yPosition = calculatePosition(ratio, startPosition.getY(), endPosition.getY(), parkingLotStartPosition.getY());
		Position parkingLotEndPosition = new Position(endPosition.getX(), yPosition, parkingLotStartPosition.getZ());
		return parkingLotEndPosition;
	}
	
	/*
	 * return start position for each of the parking area 
	 */	
	public static Map<Integer, Position> getParkingAreaStartPositionMapFromConfig() {
		Map<Integer, Position> positionMap = new HashMap<>();
		positionMap.put(1, new Position(Integer.parseInt(yardProp.getProperty("parkingAStartX")), 
				Integer.parseInt(yardProp.getProperty("parkingAStartY")), 0));
		positionMap.put(2, new Position(Integer.parseInt(yardProp.getProperty("parkingBStartX")), 
				Integer.parseInt(yardProp.getProperty("parkingBStartY")), 0));
		positionMap.put(3, new Position(Integer.parseInt(yardProp.getProperty("parkingCStartX")), 
				Integer.parseInt(yardProp.getProperty("parkingCStartY")), 0));
		positionMap.put(4, new Position(Integer.parseInt(yardProp.getProperty("parkingDStartX")), 
				Integer.parseInt(yardProp.getProperty("parkingDStartY")), 0));
		return positionMap;
	}
	
	/*
	 * return end position for each of the parking area
	 */	
	public static Map<Integer, Position> getParkingAreaEndPositionMapFromConfig() {
		Map<Integer, Position> positionMap = new HashMap<>();
		positionMap.put(1, new Position(Integer.parseInt(yardProp.getProperty("parkingAEndX")), 
				Integer.parseInt(yardProp.getProperty("parkingAEndY")), 0));
		positionMap.put(2, new Position(Integer.parseInt(yardProp.getProperty("parkingBEndX")), 
				Integer.parseInt(yardProp.getProperty("parkingBEndY")), 0));
		positionMap.put(3, new Position(Integer.parseInt(yardProp.getProperty("parkingCEndX")), 
				Integer.parseInt(yardProp.getProperty("parkingCEndY")), 0));
		positionMap.put(4, new Position(Integer.parseInt(yardProp.getProperty("parkingDEndX")), 
				Integer.parseInt(yardProp.getProperty("parkingDEndY")), 0));
		
		return positionMap;
	}
	
	public static Integer getTotalParkingSlotsInRow() {
		return slotsPerRowA+slotsPerRowB+slotsPerRowC+slotsPerRowD;
	}
	
	public static Integer calculatePosition(float ratio, Integer start, Integer end, Integer current) {
		return Math.round(current+ratio*(end-start));
	}
	
	/*
	 * length of the parking area
	 */
	public static Integer getLength(Position start, Position end) {
		return end.getX()-start.getX();
	}
	
	/*
	 * width of the parking area
	 */
	private static Integer getWidth(Integer toPosition, Integer fromPosition) {
		return toPosition-fromPosition;
	}
	
	/*
	 * push the slots size info into slotsPerRowList
	 */
	public static List<Integer> getSlotsPerRowList(Integer intA, Integer intB, Integer intC, Integer intD) {
		List<Integer> slotPerRowList = new ArrayList<>();
		slotPerRowList.add(intA);
		slotPerRowList.add(intB);
		slotPerRowList.add(intC);
		slotPerRowList.add(intD);
		return slotPerRowList;
	}
	
	public static List<Integer> getReversedSlotsList(List<Integer> slotsPerRowList) {
		Collections.reverse(slotsPerRowList);
		return slotsPerRowList;
	}
	
	/*
	 * getStartSlotsNumbMap()
	 * return a map which keeps key as lot index, value as the start slot for each parking area
	 */
	public static Map<Integer, Integer> getStartSlotsNumbMap() {
		Map<Integer, Integer> startSlotsMap = new HashMap<>();
		int i=1;
		List<Integer> startSlotsSet = getSlotsPerRowList(startSlotNumbA, startSlotNumbB, startSlotNumbC, startSlotNumbD);
		for(Integer slots: startSlotsSet) {
			if(i>startSlotsSet.size()) {
				break;
			}
			startSlotsMap.put(i, slots);
			i++;
		}
		return startSlotsMap;
	}
	
	public static Position getStartPosition() {
		return startPosition;
	}
	
	public static Position getEndPosition() {
		return endPosition;
	}
	
	public static Integer getRoadWidth() {
		return roadWidth;
	}
		
	public static float getParkingAreaDimensionRatio() {
		return parkingAreaDimensionRatio;
	}

	public static int getSlotsPerRowA() {
		return slotsPerRowA;
	}

	public static int getSlotsPerRowB() {
		return slotsPerRowB;
	}

	public static int getSlotsPerRowC() {
		return slotsPerRowC;
	}

	public static int getSlotsPerRowD() {
		return slotsPerRowD;
	}

}
