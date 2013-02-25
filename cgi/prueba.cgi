#!/bin/bash

# Interval Monitoring CGI-script



#ID=`echo "$QUERY_STRING" | grep -oE "(^|[?&])nombre=[0-9]+" | cut -f 2 -d "=" | head -n1`
INFO=`echo "$QUERY_STRING" | grep -oE "(^|[?&])fondo=[^&]+" | sed "s/%20/ /g" | cut -f 2 -d "="`

# The HTML output starts here
echo "Content-type: text/html"
echo ""

#echo $ID
echo $INFO
echo $(free -m)
#echo $QUERY_STRING
gimp -i -b '(python-fu-andtonic RUN-NONINTERACTIVE 23 "/home/al/workspace/cromaton/images/al.jpg" 4545 "/home/al/workspace/cromaton/xxx.jpg" "/home/al/workspace/cromaton/xx1.jpg" 1000 300 200 400 "/home/al/workspace/cromaton/fondo"$INFO".png" (list 137 194 64))''(gimp-quit 1)'

if [ $? != 0 ]; then
	    echo "{\"estado\":\"true\"}"
	    exit 0
else
        echo "{\"estado\":\"false\"}"
        echo $value
        exit 0
fi
