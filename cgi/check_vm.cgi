#!/bin/bash

#VBoxManage startvm -type headless "macosx"
#VBoxManage controlvm "macosx" savestate

# The HTML output starts here
echo "Content-type: text/html"
echo ""

VM=$(VBoxManage list runningvms | grep -oEe '\"+[a-z]+\"' |grep -oEe '[a-z]+')
echo "{\"estado\":\"$VM\"}"
