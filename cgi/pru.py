#!/usr/bin/python
from subprocess import check_output
import datetime
#cmd = '(python-fu-andtonic RUN-NONINTERACTIVE 23 "/home/al/workspace/cromaton/images/al.jpg" 4545 "/home/al/workspace/cromaton/images/xxx.jpg" "/home/al/workspace/cromaton/images/xx1.jpg" 1000 300 200 400 "/home/al/workspace/cromaton/images/fondo1.png" "/home/al/workspace/cromaton/images/pastilla.png" (list 137 194 64))'
#output = check_output(['/usr/bin/gimp', '-i', '-b', cmd, '-b', '(gimp-quit 0)'])
#print output
now = datetime.datetime.now()
print now.strftime("%d%H%M%S")
output = check_output(['/usr/bin/gphoto2','--capture-image','-f','/store_00010001','-p','capt0000.jpg','--filename',now.strftime("%d%H%M%S")+'.jpg'])
