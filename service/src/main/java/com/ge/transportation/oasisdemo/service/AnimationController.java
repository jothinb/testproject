package com.ge.transportation.oasisdemo.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.ge.transportation.oasisdemo.dao.OASPositionDao;
import com.ge.transportation.oasisdemo.service.SimpleMove.Direction;

@RestController
@RequestMapping(value = "/animation")
public class AnimationController {
	
	private Logger logger = LoggerFactory.getLogger(AnimationController.class);
	
	@Autowired
	private OASPositionDao positionDao;
	
	static final Map<String, Movement> MOVEMENT_DATA = new HashMap<>();

	/*
	 * websocket messaging
	 */
	@Autowired
	private SimpMessagingTemplate template;
	private TaskScheduler scheduler = new ConcurrentTaskScheduler();
	
	private Random random = new Random();
	private Direction[] directions = Direction.values();
	private boolean publish = false;
	private static final ObjectMapper MAPPER = new ObjectMapper();
	
	@MessageMapping("/publish") // incoming message endpoint as "/app/publish"
	public void publish() {
		this.publish = true;
//		logger.info("Connected!!!");
	}
	
	@PostConstruct
	private void broadcastPeriodically() throws IOException {
		scheduler.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				int index = random.nextInt(directions.length);
				Direction direction = directions[index];
//				logger.info("send to /topic/simplemove!");
				template.convertAndSend("/topic/simplemove", new SimpleMove(direction, 2*(index+1)));
			}
		}, 600);

		final List<Map<String, Movement>> gpsData = MAPPER.readValue(
				getClass().getClassLoader().getResourceAsStream("com/ge/transportation/oasisdemo/service/hostlerPosition.json"),
				TypeFactory.defaultInstance().constructCollectionType(
						List.class, MOVEMENT_DATA.getClass()));
		
		final int size = gpsData.size();
//		logger.info("gpsData size : " + size);
		
		scheduler.scheduleAtFixedRate(new Runnable() {
			private int idx = 0;
			@Override
			public void run() {
				if (publish) {
//					logger.info("send to /topic/yardmove!" + gpsData.get(idx%size));
					template.convertAndSend("/topic/yardmove", gpsData.get(idx%size));
					idx++;
//					logger.debug("=========>" + gpsData.get(idx%size));
				}
			}
		}, 600);
	}
}


