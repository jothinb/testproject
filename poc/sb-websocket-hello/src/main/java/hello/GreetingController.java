package hello;

import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

	@Autowired
	private SimpMessagingTemplate template;
	private TaskScheduler scheduler = new ConcurrentTaskScheduler();
	private HelloMessage message;

	// Request URL:ws://localhost:8080/hello/070/al812q_1/websocket
	// Request Method:GET
	// Status Code:101 Switching Protocols
	//
	// Response Headers
	// view source
	// Connection:upgrade
	// Date:Thu, 30 Apr 2015 05:48:26 GMT
	// Sec-WebSocket-Accept:fVwQjQtiww2u7tFilPvnKYeMcQY=
	// Sec-WebSocket-Extensions:permessage-deflate;client_max_window_bits=15
	// Server:Apache-Coyote/1.1
	// Upgrade:websocket
	// X-Application-Context:application
	//
	// Request Headers
	// view source
	// Accept-Encoding:gzip, deflate, sdch
	// Accept-Language:en-US,en;q=0.8
	// Cache-Control:no-cache
	// Connection:Upgrade
	// Host:localhost:8080
	// Origin:http://localhost:8080
	// Pragma:no-cache
	// Sec-WebSocket-Extensions:permessage-deflate; client_max_window_bits
	// Sec-WebSocket-Key:YDXG1MfsSmWCb6jHBglhig==
	// Sec-WebSocket-Version:13
	// Upgrade:websocket
	// User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3)
	// AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135
	// Safari/537.36// Status Code:101 Switching Protocols

	@MessageMapping("/hello")
	// incoming message endpoint
	@SendTo("/topic/greetings")	// "/topic/greetings" is the endpoint that the websocket client subscribed to
	public Greeting greeting(HelloMessage message) throws Exception {
		this.message = message;
		StringBuilder msg = new StringBuilder("Hello, ")
				.append(message.getName())
				.append(", you have established a websocket at ")
				.append(new Date()).append("!");
		return new Greeting(msg.toString());
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
					StringBuilder msg = new StringBuilder("Hello, ")
							.append(message.getName())
							.append(", the current time is ")
							.append(new Date()).append("!");
					template.convertAndSend("/topic/greetings", new Greeting(
							msg.toString()));
				}
			}
		}, 1000);
	}

}
