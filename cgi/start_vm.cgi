#!/bin/bash


# The HTML output starts here
echo "Content-type: text/html"
echo ""

# VBoxManage controlvm "macosx" savestate
VBoxManage startvm -type headless "macosx" > /dev/null
echo "{\"estado\":\"$?\"}"
