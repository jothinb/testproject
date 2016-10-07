#!/bin/sh
mv deploy.zip /local/oasis/
cd /local/oasis
rm -f backup*.zip
zip -r backup-`date +%Y-%m-%d`.zip service webapp
./kill_webapp.sh
./kill_service.sh
rm -rf webapp
unzip deploy.zip
unzip webapp.zip
mv -f service-0.0.1-SNAPSHOT.jar service
rm -f deploy.zip
rm -f webapp.zip
cp webapp/conf/application.conf webapp/conf/application.conf.bak
sed -e 's/^\#oasis\.service\.host=\"10\.202\.239\.194\"/oasis.service.host="10.202.239.194"/g' -e 's/^oasis\.service\.host=\"127\.0\.0\.1\"/#oasis.service.host="127.0.0.1"/g' -e 's/^oasis\.service\.port=8080/oasis.service.port=80/g' webapp/conf/application.conf | tee webapp/conf/application.conf
./start_service.sh
./start_webapp.sh
