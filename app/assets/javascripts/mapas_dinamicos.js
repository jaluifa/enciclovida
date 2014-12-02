
//console.log('Ya cargue los KML(Z) como Funciones en MAPAS en el indice [2]()');

/*****************************************************************************************************************/

cambiaEstado = function(input,indice)
{
    if(input.checked)
    {
        MAPAS[indice][2](MAPAS[indice][0]).setMap(map.map);
    }else{
        for(var i = 0 ; i<map.layers.length;i++){
            //console.log('Encontre Coincidencia: '+MAPAS[indice][0]+' == '+map.layers[i].url+' Procedo a borrar');
            if(MAPAS[indice][0]==map.layers[i].url){
                layer = map.layers[i];
                map.removeLayer(layer);
            }else{
                //console.log('No encontre la capa a borrar');
            }
        }
    }
}

function anadeLista()
{
    //console.log('Añadire los elementos de la lista');
    var x = '';
    for (var i=0; i<MAPAS.length; i++)
    {
        //console.log(MAPAS[i][1]);
        if (i == 0)
        {   //para el default
            x= x+'<li style="list-style: none;"><input type="checkbox" onChange="cambiaEstado(this,'+i+')" checked></input><label>'+MAPAS[i][1]+'</label></li>';
            MAPAS[i][2](MAPAS[i][0]).setMap(map.map);
        } else
            x= x+'<li style="list-style: none;"><input type="checkbox" onChange="cambiaEstado(this,'+i+')"></input><label>'+MAPAS[i][1]+'</label></li>';
    }
    return x;
}

function anadeControlCapas()
{
    //console.log('Inserto el control de cambio de capa');
    map.addControl({
        position: 'right_bottom',
        content: 	'<div class="gmapv3control overlaycontrol" id="capas" style="padding: 5px;">'+
            '<span class="ui-icon ui-icon-grip-diagonal-se">HOLA</span>'+
            '<ul id="lista_capas" style="display: none; margin-left: 20px; margin-right: 10px; padding: 0px;">Capas'+
            anadeLista()+
            '</ul>'+
            '</div>',
        style: {
            margin: '5px',
            padding: '0 0 0 0',
            border: 'solid 1px #717B87',
            background: '#fff'
        },
        events: {
            mouseover: function(){
                var controlUI = $('#capas');
                controlUI.addClass('open');
                $('#lista_capas').show();
            },
            mouseout: function(){
                var controlUI = $('#capas');
                controlUI.removeClass('open')
                $('#lista_capas').hide()
            }
//						click: function(){
//							$('#capas').toggleClass("open");
//							$('#lista_capas').toggle();
//						}
        }
    });
}

function anadeControlFullScreen()
{
    //console.log('Inserto el control de cambio de capa');
    map.addControl({
        position: 'top_right',
        content: 	'<div class="gmapv3control overlaycontrol" id="capas" style="padding: 1px;">'+
            '<span class="ui-icon ui-icon-arrow-4-diag">HOLA</span>'+
            '</div>',
        style: {
            margin: '3px',
            padding: '0 0 0 0',
            border: 'solid 1px #717B87',
            background: '#fff'
        },
        events: {
            click: function(){
                $("#map").toggleClass("fullscreen");
                if(document.getElementById("map").style.position=="relative"){
                    document.getElementById("map").style.position="fixed";
                    document.getElementById("map").style.height="100%";
                }	else{
                    document.getElementById("map").style.position="relative"
                    document.getElementById("map").style.height="500px";
                }
                google.maps.event.trigger(map.map, 'resize');
            }
        }
    });
}