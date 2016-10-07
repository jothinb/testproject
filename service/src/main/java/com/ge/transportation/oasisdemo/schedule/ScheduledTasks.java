package com.ge.transportation.oasisdemo.schedule;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.ge.transportation.oasisdemo.dao.OASCraneMovementDao;
import com.ge.transportation.oasisdemo.dao.impl.OASCraneDaoImpl;
import com.ge.transportation.oasisdemo.model.OASCraneMovement;
import com.ge.transportation.oasisdemo.service.CraneMovement;
import com.ge.transportation.oasisdemo.service.CranePosition;

@Component
public class ScheduledTasks {
	private static final Logger logger = LoggerFactory.getLogger(OASCraneDaoImpl.class);

	private static CraneMovement crane1Movement;
	private static List<CranePosition>crane1Poslist;
	private static int crane1MovementIndex = 0;
	
	private static CraneMovement crane2Movement;
	private static List<CranePosition>crane2Poslist;
	private static int crane2MovementIndex = 0;
	
	private static CraneMovement crane3Movement;
	private static List<CranePosition>crane3Poslist;
	private static int crane3MovementIndex = 0;

	private static CraneMovement crane4Movement;
	private static List<CranePosition>crane4Poslist;
	private static int crane4MovementIndex = 0;
	
	private static CraneMovement crane5Movement;
	private static List<CranePosition>crane5Poslist;
	private static int crane5MovementIndex = 0;
	

	
	@Autowired
	private SimpMessagingTemplate msgTemplate;
	
	@Autowired 
	private OASCraneMovementDao craneMovementDaoImpl;
	
	static {
		InputStream is1 = null;
		InputStream is2 = null;
		InputStream is3 = null;
		InputStream is4 = null;
		InputStream is5 = null;
		try {
			is1 = ScheduledTasks.class.getClassLoader().getResourceAsStream("com/ge/transportation/oasisdemo/service/crane1Position.json");
			is2 = ScheduledTasks.class.getClassLoader().getResourceAsStream("com/ge/transportation/oasisdemo/service/crane2Position.json");
			is3 = ScheduledTasks.class.getClassLoader().getResourceAsStream("com/ge/transportation/oasisdemo/service/crane3Position.json");
			is4 = ScheduledTasks.class.getClassLoader().getResourceAsStream("com/ge/transportation/oasisdemo/service/crane4Position.json");
			is5 = ScheduledTasks.class.getClassLoader().getResourceAsStream("com/ge/transportation/oasisdemo/service/crane5Position.json");
//			logger.debug("is1 : " + inputStreamToString(is1));
//			logger.debug("is2 : " + inputStreamToString(is2));
//			logger.debug("is3 : " + inputStreamToString(is3));
//			logger.debug("is4 : " + inputStreamToString(is4));
//			logger.debug("is5 : " + inputStreamToString(is5));
		} catch (Exception e1) {
			e1.printStackTrace();
			throw new RuntimeException ("resource read failed!");
		}
		if (is1 == null) throw new RuntimeException ("resource crane1Position.json read failed!");
		if (is2 == null) throw new RuntimeException ("resource crane2Position.json read failed!");
		if (is3 == null) throw new RuntimeException ("resource crane3Position.json read failed!");
		if (is4 == null) throw new RuntimeException ("resource crane4Position.json read failed!");
		if (is5 == null) throw new RuntimeException ("resource crane5Position.json read failed!");
		
		ObjectMapper jsonMapper = new ObjectMapper();
		// CollectionType collectionType  = TypeFactory.defaultInstance().constructCollectionType(List.class, CraneMovement.class);
		try {
			crane1Movement = jsonMapper.readValue(is1, CraneMovement.class);
			crane1Poslist = crane1Movement.getCranePositions();
			
			crane2Movement = jsonMapper.readValue(is2, CraneMovement.class);
			crane2Poslist = crane2Movement.getCranePositions();
			
			crane3Movement = jsonMapper.readValue(is3, CraneMovement.class);
			crane3Poslist = crane3Movement.getCranePositions();
			
			crane4Movement = jsonMapper.readValue(is4, CraneMovement.class);
			crane4Poslist = crane4Movement.getCranePositions();
			
			crane5Movement = jsonMapper.readValue(is5, CraneMovement.class);
			crane5Poslist = crane5Movement.getCranePositions();
			
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("Json mapping failed!");
		}
		finally {
			try {
				if (is1 != null) is1.close();
				if (is2 != null) is2.close();
				if (is3 != null) is3.close();
				if (is4 != null) is4.close();
				if (is5 != null) is5.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/*
	 * (1) read all movement events of a crane round trip from data file. 
	 * (2) save event to table one at at a time. only the current position is kept in table.
	 * (3) if the end of file is reached, start from beginning of the file.
	 */
	@Scheduled(fixedRate = 2000)
	public void saveCraneMovementEvent() {
		logger.debug("In ScheduledTasks::saveCraneMovementEvent");

		if (crane1MovementIndex >= crane1Poslist.size()) crane1MovementIndex = 0;
		OASCraneMovement osaCrane1Movement = new OASCraneMovement(crane1Movement.getCraneId(), 
				crane1Poslist.get(crane1MovementIndex).getX(),
				crane1Poslist.get(crane1MovementIndex).getY());
		craneMovementDaoImpl.saveUpdate(osaCrane1Movement);
		crane1MovementIndex++;
		
		if (crane2MovementIndex >= crane2Poslist.size()) crane2MovementIndex = 0;
		OASCraneMovement osaCrane2Movement = new OASCraneMovement(crane2Movement.getCraneId(), 
				crane2Poslist.get(crane2MovementIndex).getX(),
				crane2Poslist.get(crane2MovementIndex).getY());
		craneMovementDaoImpl.saveUpdate(osaCrane2Movement);
		crane2MovementIndex++;
		
		if (crane3MovementIndex >= crane3Poslist.size()) crane3MovementIndex = 0;
		OASCraneMovement osaCrane3Movement = new OASCraneMovement(crane3Movement.getCraneId(), 
				crane3Poslist.get(crane3MovementIndex).getX(),
				crane3Poslist.get(crane3MovementIndex).getY());
		craneMovementDaoImpl.saveUpdate(osaCrane3Movement);
		crane3MovementIndex++;
		
		if (crane4MovementIndex >= crane4Poslist.size()) crane4MovementIndex = 0;
		OASCraneMovement osaCrane4Movement = new OASCraneMovement(crane4Movement.getCraneId(), 
				crane4Poslist.get(crane4MovementIndex).getX(),
				crane4Poslist.get(crane4MovementIndex).getY());
		craneMovementDaoImpl.saveUpdate(osaCrane4Movement);
		crane4MovementIndex++;
		
		if (crane5MovementIndex >= crane5Poslist.size()) crane5MovementIndex = 0;
		OASCraneMovement osaCrane5Movement = new OASCraneMovement(crane5Movement.getCraneId(), 
				crane5Poslist.get(crane5MovementIndex).getX(),
				crane5Poslist.get(crane5MovementIndex).getY());
		craneMovementDaoImpl.saveUpdate(osaCrane5Movement);
		crane5MovementIndex++;
	}
	
	/*
	 * read the current crame position from table and push it to UI
	 */
	@Scheduled(fixedRate = 2000)
	public void pushCraneMovementEvent() {
		logger.debug("Read crane movement event from table and then push it to UI!");
		List<OASCraneMovement>movementList = craneMovementDaoImpl.findAll();
//		if (movementList != null && movementList.size() > 0) {
//			logger.info("Send crane position : " + movementList.get(0).toJson());
//			msgTemplate.convertAndSend("/topic/cranemove", posList.get(0).toJson());
//		}
		
		for (OASCraneMovement movement : movementList) {
			// logger.info("Send crane movement : " + movement.toJson());
			msgTemplate.convertAndSend("/topic/cranemove", movement.toJson());
		}
	}
	
	private static String inputStreamToString (InputStream inputStream) {
		String inputString = null;
		try {
			inputString = org.apache.commons.io.IOUtils.toString(inputStream);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return inputString;
	}
}