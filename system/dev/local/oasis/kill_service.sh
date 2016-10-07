#!/bin/sh
kill -9 `ps aux | grep "[s]ervice" | awk '{ print $2 }'`
