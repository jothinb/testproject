#!/bin/sh
mvn clean package
java -jar target/service-0.0.1-SNAPSHOT.jar
