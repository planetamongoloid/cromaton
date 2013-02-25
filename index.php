<?php
$directorio=opendir("./images/fondos/ciudades/thumbs/"); 
while ($archivo = readdir($directorio)){
    if($archivo != "." && $archivo != "..") { 
    $ciudades[] = $archivo; 
    }
    sort($ciudades);
}
closedir($directorio);
$directorio=opendir("./images/fondos/hospitales/thumbs/"); 
while ($archivo = readdir($directorio)){
    if($archivo != "." && $archivo != "..") { 
    $hospitales[] = $archivo; 
    }
    sort($hospitales);
}
closedir($directorio);
$directorio=opendir("./images/fondos/otros/thumbs/"); 
while ($archivo = readdir($directorio)){
    if($archivo != "." && $archivo != "..") { 
    $otros[] = $archivo; 
    }
    sort($otros);
}
closedir($directorio);
?>
<!DOCTYPE html >
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Croma</title>
<link rel='stylesheet' type='text/css' href="./css/reset.css" media='all' />	
<link rel='stylesheet' type='text/css' href="./css/estilo.css" media='all' />
<link rel='stylesheet' type='text/css' href="./css/jquery-ui-1.10.0.custom.min.css" media='all' />
<link rel='stylesheet' type='text/css' href="./css/imgareaselect-default.css" media='all' />	
<link rel='stylesheet' type='text/css' href="./css/galery.css" media='all' />
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.0.custom.min.js"></script>
<script type="text/javascript" src="js/jquery.history.js"></script>
<script type="text/javascript" src="js/galerrific.js"></script>
<script type="text/javascript" src="js/jquery.imgareaselect.js"></script>
<script type="text/javascript" src="./js/funciones.js" ></script>
</head>
<body>
<div id="main">
    <div id="paso1" class="pasos">
        <div id="tipos">
            <div id="ciudades" class="left"><img src="./images/ciudades.png" name="1"/></br><span class="azul upper sombra">Ciudades</span></div>
            <div id="hospitales" class="left"><img src="./images/hospitales.png" name="2"/></br><span  class="azul upper sombra">Hospitales</span></div>
            <div id="otros" class="left"><img src="./images/otros.png" name="3"/></br><span class="azul upper sombra">Otros</span></div>
            <div style="clear:both;min-height:0 !important;"></div>
            <h1 class="upper sombra">Selecciona tu fondo</h1>
        </div>
    </div>
    <div id="paso2" class="pasos">
        <div id="gallery" class="content">
					<div id="controls" class="controls"></div>
					<div class="slideshow-container">
						<div id="loading" class="loader"></div>
						<div id="slideshow" class="slideshow"></div>
					</div>
					<div id="caption" class="caption-container"></div>
		</div>      
        <div id="thumbs" class="navigation ciudades">
            <a class="pageLink prev" style="visibility: hidden;" href="#" title="Anterior"></a>
            <ul class="thumbs noscript">
                <?php foreach($ciudades as $ciudad){ 
                $nombre = explode(".",$ciudad);
                ?>
                <li>
                    <a class="thumb" name="<?=$ciudad?>" href="#" title="<?=$ciudad?>">
                        <img src="./images/fondos/ciudades/thumbs/<?=$ciudad?>" alt="<?=$ciudad?>" />
                    </a>
                    <div class="capt azul">
                        <?=$nombre[0]?>
                    </div>
                </li>
                <?php } ?>
            </ul>
            <a class="pageLink next" style="visibility: hidden;" href="#" title="Siguiente"></a>
        </div>
        <div id="thumbs" class="navigation hospitales">
            <a class="pageLink prev" style="visibility: hidden;" href="#" title="Anterior"></a>
            <ul class="thumbs noscript">
                <?php foreach($hospitales as $ciudad){ 
                $nombre = explode(".",$ciudad);
                ?>
                <li>
                    <a class="thumb" name="<?=$ciudad?>" href="#" title="<?=$ciudad?>">
                        <img src="./images/fondos/hospitales/thumbs/<?=$ciudad?>" alt="<?=$ciudad?>" />
                    </a>
                    <div class="capt azul">
                        <?=$nombre[0]?>
                    </div>
                </li>
                <?php } ?>
            </ul>
            <a class="pageLink next" style="visibility: hidden;" href="#" title="Siguiente"></a>
        </div>
        <div id="thumbs" class="navigation otros">
            <a class="pageLink prev" style="visibility: hidden;" href="#" title="Anterior"></a>
            <ul class="thumbs noscript">
                <?php foreach($otros as $ciudad){ 
                $nombre = explode(".",$ciudad);
                ?>
                <li>
                    <a class="thumb" name="<?=$ciudad?>" href="#" title="<?=$ciudad?>">
                        <img src="./images/fondos/otros/thumbs/<?=$ciudad?>" alt="<?=$ciudad?>" />
                    </a>
                    <div class="capt azul">
                        <?=$nombre[0]?>
                    </div>
                </li>
                <?php } ?>
            </ul>
            <a class="pageLink next" style="visibility: hidden;" href="#" title="Siguiente"></a>
        </div>
        <img src="./images/back.png" id="back2" class="back"/>
    </div> <!-- paso2 -->
    <div id="paso3" class="pasos">
        <div class="marco">
           
            <!--<div class="capt azul">bilbao
            </div>-->
        </div>
        <div id="sacaFoto"><img src="./images/camara.png" alt="sacar foto"/></div>
        <img src="./images/back.png" id="back3" class="back"/>
    </div>
</div>
<div id="info" class="upper sombra">Imprimiendo</div>
<a href="#" name="camera" id="camera"></a>
<a href="#" name="printer" id="printer"></a>
<a href="#" name="test" id="config"></a>
<a href="#" name="color" id="color-actual"></a>
<div id="testfoto">
    <div id="controles">
        <input name="colorpicker" id="color1" type="color"/>
        <div id="th-val"></div>        
        <div style="clear:both;"></div>
        <div id="slider"></div>
        <div id="escala"></div>
        <input value="probar" type="button" id="probar" class="input"/>        
    <input value="guardar" type="button" id="ok" class="input verde"/>
        
    </div>
</div>
<div id="fondo"><img src="./images/fondo.png" alt="fondo" class="bg"/></div>
</body>
</html>

