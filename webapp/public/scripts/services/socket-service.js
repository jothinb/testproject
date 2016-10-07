/*global define */
define(['angular', 'services-module'], function (angular, services) {
	'use strict';
	console.log("Loading socketSvc...");
	/* Services */
	services.value('version', '0.1');
	services.service('socketSvc', function($timeout, hostlerMgrSvc, craneSvc, $q, $log){


		var service = {}, listener = $q.defer(), socket = {
			client: null,
			stomp: null
		}, messageIds = [];

		service.RECONNECT_TIMEOUT = 30000;
		service.SOCKET_URL = 'http://' + oasisHost + ':' + oasisPort + '/hello';
		service.CHAT_TOPIC = '/topic/yardmove';
		service.CRANE_TOPIC = '/topic/cranemove';
		service.CHAT_BROKER = '/app/publish';

//		service.receive = function() {
//			return listener.promise;
//		};

		service.send = function() {
			socket.stomp.send(service.CHAT_BROKER, {});
		};

		var reconnect = function() {
			$timeout(function() {
				initialize();
			}, this.RECONNECT_TIMEOUT);
		};

//		var getMessage = function(data) {
//			var movementsMsg = JSON.parse(data);
//			hostlerMgrSvc.applyMovements(movementsMsg);
//			return {};
//		};

		var startListener = function() {
			service.send();

			socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
				var movementsMsg = JSON.parse(data.body);
				hostlerMgrSvc.applyMovements(movementsMsg);
				return {};
//				listener.notify(getMessage(data.body));
			});

			socket.stomp.subscribe(service.CRANE_TOPIC, function(data) {
				var cranePositionMsg = JSON.parse(data.body);
				//console.log("current crane position : " + cranePositionMsg);
				craneSvc.applyMovements(cranePositionMsg);
				return {};
			});

		};

		var initialize = function() {
			socket.client = new SockJS(service.SOCKET_URL);
			socket.stomp = Stomp.over(socket.client);
			socket.stomp.connect({}, startListener);
			socket.stomp.onclose = reconnect;
			socket.stomp.debug = null;
		};

		service.disconnect = function() {
			if (socket.stomp != null) {
				socket.stomp.disconnect();
			}
		};

		service.initialize = initialize;
		return service;
	});

	return services;
});





		// ORIGINAL CODE
//		var stompClient = null;
//		function connect() {
//			disconnect(); // quick hack to fix double-clicking of connect led to disconnect no longer working
//			var socket = new SockJS('http://localhost:8080/hello');
//			stompClient = Stomp.over(socket);
//			stompClient.connect({}, function(frame) {
//				stompClient.send("/app/publish", {});
//				stompClient.subscribe('/topic/yardmove', function(data) {
//					var movements = JSON.parse(data.body);
//					var hostlers = hostlerMgrSvc.getAllHostlers();
//					for (var i = 0; i < hostlers.length; i++) {
//						var each = hostlers[i];
//						each.mesh.move(movements[each.mesh.name]);
//					}
//				});
//				console.log('Connected: ' + frame);
//			});
//		};
//
//		function disconnect() {
//			if (stompClient != null) {
//				stompClient.disconnect();
//			}
//		};
