#!/bin/sh
echo ""
echo "--------------------------------------------------------"
echo "              NG Oasis - Developer Setup"
echo "              GE Software - Transportation"
echo "--------------------------------------------------------"
echo ""

echo "... Creating local activator configuration directory ~/.activator"
mkdir -p ~/.activator
echo "... Installing activator configuration to ~/.activator"
cp ./webapp/sys/activator/* ~/.activator
#echo "... Installing developer version of Activator app configuration"
#cp sys/webapp/conf/app.conf.local webapp/conf/app.conf
echo "Installation complete.\n"

echo "Setting git behavior to push currently selected branch"
git config --global push.default current