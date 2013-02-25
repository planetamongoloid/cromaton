#!/bin/bash
lsusb |grep Nikon > /dev/null

# The HTML output starts here
echo "Content-type: text/html"

if [ $? != 0 ]; then
	    echo "{\"estado\":\"0\"}"
	    exit 0
else
        echo "{\"estado\":\"1\"}"
        echo $value
        exit 0
fi
