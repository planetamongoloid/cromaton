#!/usr/bin/env python
# -*- coding: utf-8 -*-

from gimpfu import *
import random

def Cromar(escala, img_src, threshold, img_dst, img_dst_sin, cuadrado_x, cuadrado_y, cuadrado_w, cuadrado_h, ruta_fondo, pastilla, color):
	#pdb.gimp_message("empieza a funcionar")
	image = pdb.gimp_file_load(img_src, img_src)
	active_layer = pdb.gimp_image_get_active_layer(image)
	ruta_images = ruta_fondo
	selec1 =(1049.0,480.0,1057.0,447.0,1076.0,405.0,1014.0,342.0,981.0,231.0,999.0,117.0,1074.0,51.0,1149.0,93.0,1200.0,36.0,1467.0,42.0,1488.0,150.0,1422.0,234.0,1482.0,270.0,1446.0,357.0,1422.0,435.0,1335.0,480.0,1080.0,477.0,1014.0,495.0)
	
	imagen_fondo = ""
	resize_offx = -100
	resize_offy = -10
	resize_x = 100
	resize_y = 100
	text_color = (248,165,4)
	
	
#----------------------------   METO EL FONDO	
	image2 = pdb.gimp_file_load(ruta_images+imagen_fondo, ruta_images+imagen_fondo)
	active_layer2 = pdb.gimp_image_get_active_layer(image2)
	pdb.gimp_rect_select(image2, 0, 0, 1504, 1000, 0, 0, 0)
		
	non_empty = pdb.gimp_edit_copy(active_layer2)
	#nueva capa en la image

	layer2 = pdb.gimp_layer_new(image, 1504, 1000, 1, "capa2", 100, 0)
	#el uno es para ponerlo debajo
	pdb.gimp_image_add_layer(image, layer2, 1)
	pdb.gimp_floating_sel_anchor(pdb.gimp_edit_paste(layer2, True))
	gimp.delete(image2)
#----------------------------- hago la seleccion
	#--a 2n en el numero de puntos
	pdb.gimp_image_set_active_layer(image, active_layer)
	pdb.gimp_message("selecciono colores de fondo... y cuadrado")
	#pdb.gimp_free_select(image, 36, selec1,0, True, True, 20)
	pdb.gimp_rect_select(image, cuadrado_x, cuadrado_y, cuadrado_w, cuadrado_h, 0, 0, 0)
	pdb.gimp_by_color_select_full(active_layer, color, threshold, 1, True, True, 10,10, True, True,3)
	"""pdb.gimp_by_color_select(active_layer, (138,207,150), 15, 1, True, True, 10, True)
	pdb.gimp_by_color_select(active_layer, (110,152,106), 15, 1, True, True, 10, True)
	pdb.gimp_by_color_select(active_layer, (110,152,106), 15, 1, True, True, 10, True)
	pdb.gimp_by_color_select(active_layer, (168,237,174), 15, 1, True, True, 6, True)	
	pdb.gimp_by_color_select(active_layer, (108,167,147), 15, 1, True, True, 10, True)
	pdb.gimp_by_color_select(active_layer, (195,255,139), 15, 1, True, True, 10, True)
	pdb.gimp_by_color_select(active_layer, (217,255,170), 15, 1, True, True, 10, True)
	pdb.gimp_by_color_select(active_layer, (165,221,130), 15, 1, True, True, 10, True)
	pdb.gimp_by_color_select(active_layer, (90,120,112), 12, 1, True, True, 10, True)
	pdb.gimp_by_color_select(active_layer, (182,204,155), 12, 1, True, True, 10, True)
	pdb.gimp_by_color_select(active_layer, (134,181,126), 12, 1, True, True, 10, True)
	pdb.gimp_by_color_select(active_layer, (167,223,150), 12, 1, True, True, 10, True)
	pdb.gimp_by_color_select(active_layer, (136,186,115), 12, 1, True, True, 10, True)"""
	
		
	pdb.gimp_image_set_active_layer(image, active_layer)
	#lo copio
	non_empty = pdb.gimp_edit_copy(active_layer)
	#me hago la nueva capa y pego
	layer3 = pdb.gimp_layer_new(image, 1504, 1000, 1, "capa3", 100, 0)
	pdb.gimp_image_add_layer(image, layer3, 0)
	pdb.gimp_floating_sel_anchor(pdb.gimp_edit_paste(layer3, True))
	pdb.gimp_selection_none(image)
	#-----lo guardo sin codigo
	#union de capas visibles para guardar imagen
	pdb.gimp_layer_set_visible(active_layer, False)

	#---- redimensionar la capa para luego colocarla pdb.gimp_layer_set_offsets(layer,800,30) para moverla

	#pdb.gimp_layer_resize(layer3, resize_x, resize_y, resize_offx, resize_offy)
	#pdb.gimp_layer_scale(layer3, resize_x, resize_y, True)
	pdb.gimp_layer_scale(layer3,int(pdb.gimp_drawable_width(layer3)*escala),int(pdb.gimp_drawable_height(layer3)*escala),TRUE)
	pdb.gimp_message("alto:"+str(layer3.height)+" ancho:"+str(layer3.width))
	#pdb.gimp_layer_set_offsets(layer3, image.width/2-layer3.width/2, image.height-layer3.height)
	#pdb.gimp_layer_set_offsets(layer3, -500, -500)
	union = pdb.gimp_image_merge_visible_layers(image, 0)
	pdb.gimp_file_save(image, union, img_dst_sin, img_dst_sin)

#-------------------------------- texto codigo
	
#------------------------------ pastilla euskadi
	capa_pastilla = pdb.gimp_file_load_layer(image, pastilla)
	pdb.gimp_image_add_layer(image, capa_pastilla, 0)
#------------------------------ merge y guardado
	#union de capas visibles para guardar imagen
	union = pdb.gimp_image_merge_visible_layers(image, 0)
	#guardar
	pdb.gimp_file_save(image, union, img_dst, img_dst)
	
	gimp.delete(image)
	#pdb.gimp_quit(1)

register(
        "andtonic",
       	"croma fondos para instalación andtonic",
       	"croma fondos para instalación andtonic",
       	"al",
       	"al",
       	"2008",
       	"<Toolbox>/Xtns/Languages/Python-Fu/andtonic...",
       	"RGB*, GRAY*",
       	[
	(PF_FLOAT,    "escala", "la escala para redimensionar", 0.5),
	(PF_STRING, "img_src", "img_src", "/home/al/work/cromaAndtonic/al.jpg"),
  	(PF_INT,    "threshold", "el umbral para el color", 15          ),
	(PF_STRING, "img_dst", "Nombre salida de imagen con logo", "/home/al/work/cromaAndtonic/x.jpg"),
	(PF_STRING, "img_dst_sin", "Nombre salida de imagen sin logo", "/home/al/work/cromaAndtonic/x1.jpg"),
  	(PF_INT,    "cuadrado_x", "posicion x del cuadrado de selección", 0 ),
	(PF_INT,    "cuadrado_y", "posicion x del cuadrado de selección", 0 ),
	(PF_INT,    "cuadrado_w", "ancho del cuadrado de selección", 0 ),
	(PF_INT,    "cuadrado_h", "alto del cuadrado de selección", 0 ),
	(PF_STRING, "ruta_fondo", "ruta_fondo", "/home/al/work/cromaAndtonic/"),
    (PF_STRING, "pastilla", "pastilla de imagen", "/home/al/workspace/cromaton/images/pastilla.png"),
	(PF_COLOR,  "color", "color de seleccion", (137,191,64)    )
	],
	[],
        Cromar)
main()
