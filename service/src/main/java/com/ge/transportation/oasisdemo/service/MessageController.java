package com.ge.transportation.oasisdemo.service;

import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.web.bind.annotation.RestController;

import com.ge.transportation.oasisdemo.dao.OASCraneDao;
import com.ge.transportation.oasisdemo.dao.impl.OASCraneMovementDaoImpl;
import com.ge.transportation.oasisdemo.message.GreetingMessage;
import com.ge.transportation.oasisdemo.message.HelloMessage;
import com.ge.transportation.oasisdemo.model.OASCrane;

@RestController
public class MessageController {
	private Logger logger = LoggerFactory.getLogger(MessageController.class);
	
	@Autowired
	private SimpMessagingTemplate template;
	private TaskScheduler scheduler = new ConcurrentTaskScheduler();
	private HelloMessage message;

	@Autowired
	private OASCraneDao craneDao;

	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public GreetingMessage greeting(HelloMessage message) throws Exception {
//		logger.info("In MessageController::greeting" + message);
		this.message = message;
		StringBuilder msg = new StringBuilder("Hello, ")
				.append(message.getName())
				.append(", you have established a websocket at ")
				.append(new Date()).append("!");
		return new GreetingMessage(msg.toString());
	}

	private HelloMessage getMessage() {
		return this.message;
	}

	@PostConstruct
	private void broadcastPeriodically() {
		scheduler.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				if (getMessage() != null) {
					StringBuilder msgToUI = new StringBuilder();
					List<OASCrane> cranes = craneDao.findAll();
					for (OASCrane crane : cranes) {
						msgToUI.append(crane.toString() + " ");
					}
					template.convertAndSend("/topic/greetings",
							new GreetingMessage(msgToUI.toString()));
				}
			}
		}, 1000);
	}
}
