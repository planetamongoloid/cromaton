#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-
import cgi
import cgitb
from subprocess import check_output,Popen
import datetime
cgitb.enable()

RUTA = "/home/wsk01/web/cromaton/images/"
ORIG = "orig/"
CROMA = "croma/"
PRINTER = "192.168.1.124"
form = cgi.FieldStorage()
accion = form.getvalue('accion')
fondo = form.getvalue('fondo')
n_foto = form.getvalue('foto')
def foto():
    # sacar la foto
    now = datetime.datetime.now()
    n_foto = now.strftime("%m%d%H%M%S")
    output = Popen('echo 0 \; |pdsend 1234 192.168.1.10',shell=True)
    #output = check_output(['/usr/bin/gphoto2','--capture-image','-f','/store_00010001','-p','capt0000.jpg','--filename',RUTA+ORIG+n_foto+'.jpg'])
    print "{\"fondo\":\""+fondo+"\",\"foto\":\""+n_foto+"\"}"
def croma():
    output = Popen('echo 1 \; |pdsend 1234 192.168.1.10',shell=True)
    # (list 137 194 64) el verde
    r = form.getvalue('r')
    g = form.getvalue('g')
    b = form.getvalue('b')
    x1 = form.getvalue('x1')
    y1 = form.getvalue('y1')
    w = form.getvalue('w')
    h = form.getvalue('h')
    th = form.getvalue('th')
    escala = form.getvalue('escala')
    cmd = '(python-fu-andtonic RUN-NONINTERACTIVE '+escala+' "'+RUTA+ORIG+n_foto+'.jpg" '+th+' "'+RUTA+CROMA+n_foto+'conLogo.jpg" "'+RUTA+CROMA+n_foto+'sinLogo.jpg" '+x1+' '+y1+' '+w+' '+h+' "'+RUTA+'fondos/'+fondo+'.jpg" "'+RUTA+'pastilla.png" (list '+r+' '+g+' '+b+'))'
    output = check_output(['/usr/bin/gimp', '-i', '-b', cmd, '-b', '(gimp-quit 0)'])
    print "{\"fondo\":\""+fondo+"\",\"foto\":\""+n_foto+"sinLogo.jpg\"}"
def imprimir():
    # la accion de imprimir
    # se puede añadir la opción : -o fit-to-page
    #output = check_output(['/usr/bin/lp','-h',PRINTER+':631','-d','Sony_UP_DR150','-o','media=Paper4x6','-o','fit-to-page', RUTA+CROMA+n_foto])
    print "{\"fondo\":\""+fondo+"\",\"foto\":\""+n_foto+"\"}"



#--cabecera
print "Content-type: text/html"
print
#--fin cabecera 
if accion == '0':
    foto()
elif accion == '1':
    croma()
elif accion == '2':
    imprimir()
else:
    print "no se conoce"
#print "{\"fondo\":\""+fondo+"\",\"foto\":\""+n_foto+"\"}"

