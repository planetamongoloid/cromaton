#!/bin/bash


# The HTML output starts here
echo "Content-type: text/html"
echo ""

killall gphoto2 > /dev/null
echo "{\"estado\":\"$?\"}"
