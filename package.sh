#!/bin/sh
zip -r webapp webapp
cp service/target/service-0.0.1-SNAPSHOT.jar .
zip -r deploy webapp.zip service-0.0.1-SNAPSHOT.jar
rm service-0.0.1-SNAPSHOT.jar
rm webapp.zip
echo "\nRun the following command to deploy to the OASIS Jump server:\n"
echo "\tscp deploy.zip oasisjump:~/"
echo "\tssh oasisjump './deploy.sh'\n"
