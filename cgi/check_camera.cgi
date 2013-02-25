#!/bin/bash


# The HTML output starts here
echo "Content-type: text/html"
echo ""

lsusb | grep Nikon > /dev/null
echo "{\"estado\":\"$?\"}"
