package com.ge.transportation.oasisdemo.service.util.test;

import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ge.transportation.oasisdemo.model.Position;
import com.ge.transportation.oasisdemo.service.DataAccessController;
import com.ge.transportation.oasisdemo.service.util.ContainerUtil;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = DataAccessController.class)
public class ContainerUtilTest {
	
	private Position startPosition = ContainerUtil.getStartPosition();
	private Position endPosition = ContainerUtil.getEndPosition();
	private Integer roadWidth = ContainerUtil.getRoadWidth();
	private float parkingAreaDimensionRatio = ContainerUtil.getParkingAreaDimensionRatio();
	
	private Logger logger = LoggerFactory.getLogger(ContainerUtilTest.class);
	
	@Test
	public void testGetParkingLotStartPosition() throws Exception {
		Position parkingLotStartPosition=ContainerUtil.getParkingLotStartPosition(startPosition, endPosition, parkingAreaDimensionRatio);
		String msg = "Testing ContainerUtil.getParkingLotStartPosition(startPosition, endPosition, parkingAreaDimensionRatio).";
		logger.info(msg);
		Assert.assertNotNull(parkingLotStartPosition);
		Assert.assertEquals(msg, parkingLotStartPosition.equals(new Position(1403,4696,90)), true);
	}
	
	@Test
	public void testCalculatePosition() throws Exception {
		Integer calculatedEndPoint = ContainerUtil.calculatePosition(parkingAreaDimensionRatio, startPosition.getY(), endPosition.getY(), startPosition.getY());
		String msg = "Testing ContainerUtil.calculatePosition(parkingAreaDimensionRatio, startPosition.getY(), endPosition.getY(), startPosition.getY()).";
		logger.info(msg);
		System.out.println("calculatedEndPoint: "+calculatedEndPoint);
		Assert.assertNotNull(calculatedEndPoint);
		Assert.assertEquals(msg, calculatedEndPoint.equals(4696), true);
	}
	
	@Test
	public void testGetParkingLotEndPosition() throws Exception {
		Position parkingLotEndPosition=ContainerUtil.getParkingLotEndPosition(startPosition, endPosition, parkingAreaDimensionRatio);
		String msg = "Testing ContainerUtil.getParkingLotEndPosition(startPosition, endPosition, parkingAreaDimensionRatio).";
		logger.info(msg);
		Assert.assertNotNull(parkingLotEndPosition);
		Assert.assertEquals(msg, parkingLotEndPosition.equals(new Position(79307, 7150, 90)), true);
	}
	
	@Test
	public void testGetTotalParkingSlotsInRow() throws Exception {
		Integer totalSlots = ContainerUtil.getTotalParkingSlotsInRow();
		String msg = "Testing ContainerUtil.getTotalParkingSlotsInRow().";
		logger.info(msg);
		Assert.assertNotNull(totalSlots);
		Assert.assertEquals(msg, totalSlots.equals(589), true);
	}
	
	@Test
	public void testGetLength() throws Exception {
		Integer length = ContainerUtil.getLength(ContainerUtil.getParkingLotStartPosition(startPosition, endPosition, parkingAreaDimensionRatio), 
				ContainerUtil.getParkingLotEndPosition(startPosition, endPosition, parkingAreaDimensionRatio));
		String msg = "Testing ContainerUtil.getLength().";
		logger.info(msg);
		Assert.assertNotNull(length);
		Assert.assertEquals(msg, length.equals(77904), true);
	}

	@Test
	public void testGetParkingAreaStartPositionMap() throws Exception {
		Map<Integer, Position> parkingAreaStartPositionMap = ContainerUtil.getParkingAreaStartPositionMapFromConfig();
		System.out.println("parking lot start: "+ContainerUtil.getParkingLotStartPosition(startPosition, endPosition, parkingAreaDimensionRatio));
		System.out.println("parking lot end: "+ContainerUtil.getParkingLotEndPosition(startPosition, endPosition, parkingAreaDimensionRatio));
		System.out.println("getSlotsList(): "+getSlotsList().get(0)+" "+getSlotsList().get(1)+" "+getSlotsList().get(2)+" "+getSlotsList().get(3));
		System.out.println("roadWidth: "+roadWidth);
		String msg = "Testing ContainerUtil.getParkingAreaStartPositionMap().";
		logger.info(msg);
		Assert.assertNotNull(msg, parkingAreaStartPositionMap);
		Assert.assertEquals(parkingAreaStartPositionMap.size(), 4);
		Assert.assertEquals(parkingAreaStartPositionMap.get(1).equals(new Position(1403, 4696, 90)), true);
		Assert.assertEquals(parkingAreaStartPositionMap.get(2).equals(new Position(19936, 4696, 90)), true);
		Assert.assertEquals(parkingAreaStartPositionMap.get(3).equals(new Position(35845, 4696, 90)), true);
		Assert.assertEquals(parkingAreaStartPositionMap.get(4).equals(new Position(57360, 4696, 90)), true);
	}	
	
	@Test
	public void testGetParkingAreaEndPositionMap() throws Exception {
		Map<Integer, Position> parkingAreaEndPositionMap = ContainerUtil.getParkingAreaEndPositionMapFromConfig();
		String msg = "Testing ContainerUtil.getParkingAreaEndPositionMap().";
		logger.info(msg);
		Assert.assertNotNull(msg, parkingAreaEndPositionMap);
		Assert.assertEquals(parkingAreaEndPositionMap.size(), 4);
		Assert.assertEquals(parkingAreaEndPositionMap.get(1).equals(new Position(17386, 7150, 90)), true);
		Assert.assertEquals(parkingAreaEndPositionMap.get(2).equals(new Position(33295, 7150, 90)), true);
		Assert.assertEquals(parkingAreaEndPositionMap.get(3).equals(new Position(54810, 7150, 90)), true);
		Assert.assertEquals(parkingAreaEndPositionMap.get(4).equals(new Position(79307, 7150, 90)), true);
	}
	
	@Test
	public void testGetStartSlotsMap() throws Exception {
		Map<Integer, Integer> startSlotsMap = ContainerUtil.getStartSlotsNumbMap();
		String msg = "Testing ContainerUtil.getStartSlotsMap().";
		logger.info(msg);
		Assert.assertNotNull(msg, startSlotsMap);
		Assert.assertEquals(startSlotsMap.size(), 4);
		Assert.assertEquals(startSlotsMap.get(1).equals(1001), true);
		Assert.assertEquals(startSlotsMap.get(2).equals(2001), true);
		Assert.assertEquals(startSlotsMap.get(3).equals(3001), true);
		Assert.assertEquals(startSlotsMap.get(4).equals(4001), true);
	}
	
	@Test
	public void testGetPostionMap() throws Exception {
		Map<Integer, Position> positionMap = ContainerUtil.getSlotPositionMap(getSlotsList(), 
				ContainerUtil.getParkingAreaStartPositionMapFromConfig(), 
				ContainerUtil.getParkingAreaEndPositionMapFromConfig(), 
				ContainerUtil.getStartSlotsNumbMap());
		String msg = "Testing ContainerUtil.getPostionMap().";
		logger.info(msg);
		Assert.assertNotNull(msg, positionMap);
		Assert.assertEquals(positionMap.size(), 1767);
		Assert.assertEquals(positionMap.get(4027).equals(new Position(60461, 4696, 90)), true);
		Assert.assertEquals(positionMap.get(3424).equals(new Position(48369, 6332, 90)), true);
	}
	
	private List<Integer> getSlotsList() {
		return ContainerUtil.getSlotsPerRowList(ContainerUtil.getSlotsPerRowA(), ContainerUtil.getSlotsPerRowB(), ContainerUtil.getSlotsPerRowC(), ContainerUtil.getSlotsPerRowD());
	}
	
}
