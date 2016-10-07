#!/bin/bash
#

if [ $# -ne 2 ] ; then
 echo Usage : $0 dexxxxxx your-sso
 exit -1
fi

ssh -A -t -l $1 10.202.255.10 -L 9000:localhost:9000 ssh -A -t -l $2  10.202.239.194 -L 9000:localhost:9000
