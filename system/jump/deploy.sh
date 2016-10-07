#!/bin/sh
scp ~/deploy.zip oasisdev:~/
printf "\nRun the following commands to deploy to the OASIS Dev server:\n\n"
printf "\tssh oasisdev\n"
printf "\tsudo su\n"
printf "\t./deploy.sh\n\n"
