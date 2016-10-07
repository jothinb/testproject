# Initial: Thu Apr 30 08:50:14 PDT 2015
#
#

This is a prototype of Spring Boot with periodic webSocket push. It is based on the following two resources

1. https://spring.io/guides/gs/messaging-stomp-websocket/
2. http://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html

To exercise the prototype, do

1. mvn clean package && java -jar target/sb-websocket-0.1.0.jar
2. Use a browser to access http://localhost:8080
3. Click "connect"
4. Enter "OASIS" (or any string) and click "send"
5. Should expect to see something similar to the following:

Hello, OASIS, you have established a WebSocket at Thu Apr 30 08:33:02 PDT 2015!

Hello, OASIS, the current time is Thu Apr 30 08:33:03 PDT 2015!

Hello, OASIS, the current time is Thu Apr 30 08:33:04 PDT 2015!

Hello, OASIS, the current time is Thu Apr 30 08:33:05 PDT 2015!

Detail on the prototype:

1. Tech stacks: 
   a) Server-side: Spring Boot + WebSocket + Stomp + in-memory simple message broker + scheduler
   b) Client-side: SockJS + Stomp
2. A scheduled task pushes out the "Hello ..." message at 1 second interval.
3. Browser "connect" button submits an HTTP Upgrade request to switch to the WebSocket protocol.
4. Server returns HTTP 101 to establish a persistent WebSocket connection.
5. Client-Server API's:
   a) "/hello" -- REST end point for negotiating the WebSocket
   b) "/topic/greetings" -- Stomp endpoint for server push and client subscription
   c) "/app/hello" -- Stomp over WebSocket endpoint
