package com.ge.transportation.oasisdemo.message;

/*
 * message to web client through websocket
 */
public class GreetingMessage {
	private final String content;

	public GreetingMessage(String content) {
		this.content = content;
	}

	public String getContent() {
		return this.content;
	}
}
