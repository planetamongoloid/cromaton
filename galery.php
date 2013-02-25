<?php 

$directorio=opendir("./images/fondos/ciudades/"); 
while ($archivo = readdir($directorio)){
    if($archivo != "." && $archivo != "..") { 
    $ciudades[] = $archivo; 
    }
}
closedir($directorio); 
//var_dump($archivos);

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
<script type="text/javascript" src="js/galerrific.js"></script>
</head>
<body>
        <div id="gallery" class="content">
					<div id="controls" class="controls"></div>
					<div class="slideshow-container">
						<div id="loading" class="loader"></div>
						<div id="slideshow" class="slideshow"></div>
					</div>
					<div id="caption" class="caption-container"></div>
		</div>        
   
        <div id="thumbs" class="navigation">
            <ul class="thumbs noscript">
                <?php for($i=0;$i<28;$i++){ ?>
                <li>
                    <a class="thumb" name="optionalCustomIdentifier" href="./images/fondos/ciudad<?=$i?>.png" title="your image title">
                        <img src="./images/fondos/ciudad<?=$i?>.png" alt="your image title again for graceful degradation" />
                    </a>
                    <div class="caption">
                        (Any html can go here)
                    </div>
                </li>
                <?php } ?>
            </ul>
        </div>
<script type="text/javascript">
			jQuery(document).ready(function($) {
				// We only want these styles applied when javascript is enabled
				$('div.navigation').css({'width' : '670px', 'float' : 'left'});
				

				// Initially set opacity on thumbs and add
				// additional styling for hover effect on thumbs
				
				// Initialize Advanced Galleriffic Gallery
				var gallery = $('#thumbs').galleriffic({
					delay:                     2500,
					numThumbs:                 16,
					preloadAhead:              10,
					enableTopPager:            true,
					enableBottomPager:         true,
					maxPagesToShow:            7,
					imageContainerSel:         '#slideshow',
					controlsContainerSel:      '#controls',
					captionContainerSel:       '#caption',
					loadingContainerSel:       '#loading',
					renderSSControls:          true,
					renderNavControls:         true,
					playLinkText:              'Play Slideshow',
					pauseLinkText:             'Pause Slideshow',
					prevLinkText:              '&lsaquo; Previous Photo',
					nextLinkText:              'Next Photo &rsaquo;',
					nextPageLinkText:          'Next &rsaquo;',
					prevPageLinkText:          '&lsaquo; Prev',
					enableHistory:             false,
					autoStart:                 false,
					syncTransitions:           true,
					defaultTransitionDuration: 900,
					onSlideChange:             function(prevIndex, nextIndex) {
						// 'this' refers to the gallery, which is an extension of $('#thumbs')
						
					},
					onPageTransitionOut:       function(callback) {
						this.fadeTo('fast', 0.0, callback);
					},
					onPageTransitionIn:        function() {
						this.fadeTo('fast', 1.0);
					}
				});
			});
		</script>
</body>
</html>
