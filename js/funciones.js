function rgbToHex(R,G,B) {return "#"+toHex(R)+toHex(G)+toHex(B)}
function toHex(N) {
 if (N==null) return "00";
 N=parseInt(N); if (N==0 || isNaN(N)) return "00";
 N=Math.max(0,N); N=Math.min(N,255); N=Math.round(N);
 return "0123456789ABCDEF".charAt((N-N%16)/16)
      + "0123456789ABCDEF".charAt(N%16);
}  
function check_camera(){
    $.ajax({
        url:"cgi/check_camera.cgi",
        dataType:"json"
    }).done(function(json){
        $("#camera").toggleClass("desconectado",json.estado == 1);
        if(json.estado == 1){
            $("#imagenes").hide();
        }else{
            $("#imagenes").show();
        }
    });
}
function start_vm(){
	$.ajax({
		url:"cgi/start_vm.cgi",
		datatype:"json",
		beforeSend:function (){
			$("#info").html("preparando sist. impresion").toggle();
		}
	}).done(function(json){
		$("#info").toggle();
        console.log("Estado de vm: "+json);
	});
}
function check_vm(){
    $.ajax({
        url:"cgi/check_vm.cgi",
        dataType:"json"
    }).done(function(json){
        $("#printer").toggleClass("desconectado",json.estado == "");
    });
}
function preview(img, selection) {
     
}   
function setSize(img, selection){
    localStorage.x1 = selection.x1;
    localStorage.y1 = selection.y1;
    localStorage.x2 = selection.x2;
    localStorage.y2 = selection.y2;
    localStorage.width = selection.width;
    localStorage.height = selection.height;
    console.log("tamaño cambiado a:"+localStorage.getItem('width')+"x"+localStorage.getItem('height'));
    console.log("posiciones: x1-"+selection.x1+" y1-"+selection.y1+" x2-"+selection.x2+" y2"+selection.y2);
}
$(document).ready(function() {
    var ias = false;
    //start_vm();
    check_camera();
    var interval = setInterval(check_camera,3000);
    var interval = setInterval(check_vm,30000);
    $("#color-actual").css('background-color',"rgb("+localStorage.getItem('r')+","+localStorage.getItem('g')+","+localStorage.getItem('b')+")");
    console.log("el tamaño actual:"+localStorage.getItem('width')+"x"+localStorage.getItem('height'));
    console.log("el color actual:rgb("+localStorage.getItem('r')+","+localStorage.getItem('g')+","+localStorage.getItem('b')+")");
    $("#color1").val(rgbToHex(localStorage.getItem('r'),localStorage.getItem('g'),localStorage.getItem('b')));
    $("#th-val").html(localStorage.getItem('threshold'));
    //---------------------------------
    $("#camera").on('click',function(){
         $.ajax({
                url:"cgi/reiniciar_camera.cgi",
                dataType:"json",
                beforeSend: function(){                      
                }                

            }).done(function(json){ location.reload();});
    });
    $("#slider").slider({range:"min",min:0,max:50,value:localStorage.threshold,slide: function( event, ui ) {
        localStorage.threshold = ui.value;
        $("#th-val").html(ui.value);
        console.log(localStorage.threshold);
        }
    });
    $("#escala").slider({range:"min",min:1,max:10,value:localStorage.escala*10,slide: function( event, ui ) {
        localStorage.escala = Number((ui.value*0.1).toFixed(1));
        //$("#th-val").html(ui.value);
        console.log(localStorage.getItem('escala'));
        }
    });
    $("#color1").change(function(){        
        var hexStr = $(this).val();  // 190 ie bebebe
        var hex = parseInt(hexStr.substring(1), 16);
        localStorage.r = (hex & 0xff0000) >> 16;
        localStorage.g = (hex & 0x00ff00) >> 8;
        localStorage.b = hex & 0x0000ff;
        $("#color-actual").css('background-color',"rgb("+localStorage.getItem('r')+","+localStorage.getItem('g')+","+localStorage.getItem('b')+")");
        console.log(localStorage.getItem('r'));
    });
    //--------------- CONFIGURACION-----------------
    $("#config").on('click',function(){
        $.ajax({
                        url:"cgi/script.py",
                        data:{accion:"0", fondo:"2",foto:"al.jpg"},
                        dataType:"json",
                        beforeSend: function(){
                            console.log("test..."); 
                            $("#info").html("sacando foto").toggle(); 
                            clearInterval(interval);                        
                            $('.pasos').fadeOut();    
                        }                

                    }).done(function(jsonTest){
                        //console.log(jsonTest);
                        localStorage.testFoto = jsonTest.foto;
                        //prueba BORRAR
                        localStorage.testFoto = '1';
                        var img = $("<img />").attr({'src':'/web/cromaton/images/orig/'+localStorage.getItem('testFoto')+'.jpg','id':'img-conf','name':jsonTest.foto})
                        .load(function() {
                            $("#info").toggle();
                            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                                alert('broken image!');
                            } else {
                                $("#testfoto").append(img).show();
                                    ias = $("#img-conf").imgAreaSelect({ imageWidth:1504,imageHeight:1000,handles: "corners",fadeSpeed: 200, x1:localStorage.getItem('x1'),y1:localStorage.getItem('y1'),x2:localStorage.getItem('x2'),y2:localStorage.getItem('y2'), onSelectEnd: setSize,instance: true,resizeMargin:50  });
                                    $("#ok").on('click',function(){
                                        ias.setOptions({ hide: true });
                                        $("#testfoto img").remove();
                                        $("#testfoto").fadeOut();
                                        $('.pasos').hide();
                                        $('#paso1').fadeIn();
                                        // reinicio el contador
                                        interval = setInterval(check_camera,3000);
                                    });
                                        
                            }
                        });
                    
                    });
    });
    //--------------- PRUEBA -----------------
    $("#probar").on('click',function(){
        $.ajax({
                    url:"cgi/script.py",
                    data:{accion:"1", fondo:localStorage.getItem('tipo')+'/'+localStorage.getItem('selFoto'),foto:localStorage.testFoto,r:localStorage.getItem('r'),g:localStorage.getItem('g'),b:localStorage.getItem('b'),x1:localStorage.getItem('x1'),y1:localStorage.getItem('y1'),w:localStorage.getItem('width'),h:localStorage.getItem('height'),th:localStorage.getItem('threshold'),escala:localStorage.getItem('escala')},
                    dataType:"json",
                    beforeSend: function(){
                        console.log("mando cromar prueba...");
                        $("#info").html("probar croma").toggle();
                        $("#testfoto").toggleClass("desconectado");  
                        $("#info").html('creando croma..');                      
                    }                
                }).done(function(json){
                    ias.setOptions({ hide: true });
                    $("#testfoto img").remove();
                    var img = $("<img />").attr({'src':'/web/cromaton/images/croma/'+json.foto,'id':'img-conf','name':json.foto+'.jpg'})
                        .load(function() {
                            $("#info").toggle();
                            $("#testfoto").toggleClass("desconectado"); 
                            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                                alert('broken image!');
                            } else {
                                $("#testfoto").append(img).show();
                            }
                        });
                });    
    });
    //--------------- DESKTOP -----------------
    $('#sacaFoto').on('click',function(){
        console.log("selecciono fondo:"+localStorage.getItem('selFoto'));
        /*$.getJSON("cgi/script.py",{accion:"0", fondo:$(this).attr('name'),foto:"al.jpg"},function(json){
            console.log("JSON Data: " + json.fondo + json.foto);
        });*/
        $.ajax({
            url:"cgi/script.py",
            data:{accion:"0", fondo:localStorage.getItem('selFoto'),foto:"al.jpg"},
            dataType:"json",
            beforeSend: function(){
                console.log("mando sacar foto...");
                $(".pasos").hide();
                $("#info").toggle().html('tomando foto..');
            }
        }).done(function(json){
                    console.log("JSON Data: " + json.fondo + json.foto);
                    $.ajax({
                        url:"cgi/script.py",
                        data:{accion:"1", fondo:localStorage.getItem('tipo')+'/'+localStorage.getItem('selFoto'),foto:json.foto,r:localStorage.getItem('r'),g:localStorage.getItem('g'),b:localStorage.getItem('b'),x1:localStorage.getItem('x1'),y1:localStorage.getItem('y1'),w:localStorage.getItem('width'),h:localStorage.getItem('height'),th:localStorage.getItem('threshold'),escala:localStorage.getItem('escala')},
                        dataType:"json",
                        beforeSend: function(){
                            console.log("mando cromar...");  
                            $("#info").html('creando croma..');                      
                        }                

                    }).done(function(json2){
                        $.ajax({
                        url:"cgi/script.py",
                        data:{accion:"2", fondo:json2.fondo,foto:json2.foto},
                        dataType:"json",
                        beforeSend: function(){
                            console.log("mando mando imprimir...");
                            $("#info").html('enviando a impresora..');
                        }                

                        }).done(function(json3){                            
                            console.log("impreso")
                            $("#info").html('imprimiendo..').fadeOut(800);
                            $('.pasos').hide();
                            $("#paso1").show("slow");
                        });
                    });
            
        });
    });
    $("#tipos div").on("click",function(){
        localStorage.tipo = $(this).attr("id");
        $("#paso1").hide();
        $("#paso2").show();
        $("#thumbs").hide();
        $("#thumbs."+localStorage.getItem('tipo')).show();
        $("#thumbs."+localStorage.getItem('tipo')+" li").on("click",function(){
            console.log("hola");
            localStorage.selFoto = (($(this).find("a").attr("title")).split("."))[0];
            var nombreFoto = $(this).find("a").attr("title");
            $(".pasos").hide();
            var img = $("<img />").attr({'src':'/web/cromaton/images/fondos/'+localStorage.getItem('tipo')+'/'+nombreFoto,'class':'seleccion','name':nombreFoto})
                        .load(function() {
                            
                            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                                alert('broken image!');
                            } else {
                                $(".marco").html('').append(img).append('<div class="capt azul">'+localStorage.getItem('selFoto')+'</div>');
                                $("#paso3").show();
                            }
                        });
            
        });
    });
    $("#back2").on("click",function(){
        $('.marco').html('');
        $('.pasos').hide();
        $('#paso1').show();
    });
    $("#back3").on("click",function(){
        $('.marco').html('');
        $('.pasos').hide();
        $('#paso2').show();
    });
    //---------------------------------------
    //----------- galeria -------------------
    //---------------------------------------
    $('div.navigation').css({'width' : '704px', 'float' : 'left'});
				

				// Initially set opacity on thumbs and add
				// additional styling for hover effect on thumbs
				
				// Initialize Advanced Galleriffic Gallery
				var gallery = $('#thumbs').galleriffic({
					delay:                     2500,
					numThumbs:                 16,
					preloadAhead:              10,
					enableTopPager:            false,
					enableBottomPager:         false,
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
						this.find('ul.thumbs').children()
							
							.eq(nextIndex).fadeTo('fast', 1.0);

						// Update the photo index display
						this.$captionContainer.find('div.photo-index')
							.html('Photo '+ (nextIndex+1) +' of '+ this.data.length);
					},
					onPageTransitionOut:       function(callback) {
						this.fadeTo('fast', 0.0, callback);
					},
					onPageTransitionIn:        function() {
						var prevPageLink = this.find('a.prev').css('visibility', 'hidden');
						var nextPageLink = this.find('a.next').css('visibility', 'hidden');
						
						// Show appropriate next / prev page links
						if (this.displayedPage > 0)
							prevPageLink.css('visibility', 'visible');

						var lastPage = this.getNumPages() - 1;
						if (this.displayedPage < lastPage)
							nextPageLink.css('visibility', 'visible');

						this.fadeTo('fast', 1.0);
					}
				});
                
				/**************** Event handlers for custom next / prev page links **********************/

				gallery.find('a.prev').click(function(e) {
					gallery.previousPage();
					e.preventDefault();
				});

				gallery.find('a.next').click(function(e) {
					gallery.nextPage();
					e.preventDefault();
				});
                /****************************************************************************************/

				/**** Functions to support integration of galleriffic with the jquery.history plugin ****/

				// PageLoad function
				// This function is called when:
				// 1. after calling $.historyInit();
				// 2. after calling $.historyLoad();
				// 3. after pushing "Go Back" button of a browser
				function pageload(hash) {
					// alert("pageload: " + hash);
					// hash doesn't contain the first # character.
					if(hash) {
						$.galleriffic.gotoImage(hash);
					} else {
						gallery.gotoIndex(0);
					}
				}

				// Initialize history plugin.
				// The callback is called at once by present location.hash. 
				$.historyInit(pageload, "advanced.html");

				// set onlick event for buttons using the jQuery 1.3 live method
				$("a[rel='history']").live('click', function(e) {
					if (e.button != 0) return true;

					var hash = this.href;
					hash = hash.replace(/^.*#/, '');

					// moves to a new page. 
					// pageload is called at once. 
					// hash don't contain "#", "?"
					$.historyLoad(hash);

					return false;
				});

				/****************************************************************************************/

});
		               
		           
