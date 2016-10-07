#!/bin/sh
git co develop
git pull
git co local-dev
git merge develop
