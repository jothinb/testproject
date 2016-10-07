#!/bin/sh -e

BASEDIR=$(pwd)

#Path of jars
SERVICE_PATH="target/service-0.0.1-SNAPSHOT.jar"
WS_PATH="target/sb-websocket-hello-0.1.0.jar"
WEBAPP_PATH="target/universal/predix-dashboard-1.0.0-SNAPSHOT.zip"

#CF link
SERVICE_LINK="sit-poc-service"
WS_LINK="sit-poc-ws"
WEBAPP_LINK="sit-poc-app"
CF_POSTFIX="grc-apps.svc.ice.ge.com"

#Colors for messages
esc=`echo -en "\033"`
cc_red="${esc}[0;31m"
cc_green="${esc}[0;32m"
cc_yellow="${esc}[0;33m"
cc_normal=`echo -en "${esc}[m\017"`

function deployAll {
	echo "-> Using Cloud Foundry version: $(cf --version)"
	echo "-> Using CF org SIT: $(cf org SIT)"
	echo "-> Using CF space development: $(cf space development)"

	deployService && deployWs && deployWebapp && cd "$BASEDIR"
}

function deployWebapp {
	msg "Building webapp Using activator version: $(activator --version)"
	cd webapp && echo "cd into $(pwd)"
	activator dist && cf push $WEBAPP_LINK -p $WEBAPP_PATH
	successMsg "Successfully deployed webapp to $WEBAPP_LINK.$CF_POSTFIX"
	cd "$BASEDIR"
}

function deployService {
	msg "Building service"
	cd service && echo "cd into $(pwd)"
	mvnCleanInstall && cf push $SERVICE_LINK -p $SERVICE_PATH
	successMsg "Successfully deployed service to $SERVICE_LINK.$CF_POSTFIX"
	cd "$BASEDIR"
}

function deployWs {
	msg "Building sb-websocket-hello"
	cd poc/sb-websocket-hello && echo "cd into $(pwd)"
	mvnCleanInstall && cf push $WS_LINK -p $WS_PATH
	successMsg "Successfully deployed sb-websocket-hello to $WS_LINK.$CF_POSTFIX"
	cd "$BASEDIR"
}

function mvnCleanInstall {
  mvn clean install -Dmaven.test.failure.ignore=true
}

function msg {
	echo
	echo ${cc_yellow}- $@${cc_normal}
	echo
}

function successMsg {
	echo
    echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    echo    ${cc_green}$@${cc_normal}
    echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    echo
}

function exceptionMsg {
	echo
	echo ${cc_red}$@${cc_normal}
	echo
}

function die {
    echo
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo      !!!!!!!!!!!!!!!  ${cc_red}$@ DEPLOY FAILED${cc_normal} !!!!!!!!!!!!!!!
    echo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    echo
    
    exit 1
}

echo
echo "--------------------------------------------------------"
echo "              NG Oasis - Build & Deploy to CF"
echo "                  GE Transportation GSS"
echo "--------------------------------------------------------"
echo

deployAll || die
successMsg "Cheers! All modules have been successfully deployed..."