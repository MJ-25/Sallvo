$(function() {
    loadData();
    loadData2();
    $("#logout-btn").click(function () {
        logout(event);
      });
});

/* Metodos propios de gridstack:
all the functionalities are explained in the gridstack github
https://github.com/gridstack/gridstack.js/tree/develop/doc
*/
$(() => loadGrid())
//Función principal que dispara el frame gridstack.js y carga la matriz con los barcos
const loadGrid = function () {
    var options = {
        //matriz 10 x 10
        width: 10,
        height: 10,
        //espacio entre las celdas (widgets)
        verticalMargin: 0,
        //altura de las celdas
        cellHeight: 45,
        //inhabilita la posibilidad de modificar el tamaño
        disableResize: true,
        //floating widgets
		float: true,
        //removeTimeout: tiempo en milisegundos antes de que el widget sea removido
        //mientras se arrastra fuera de la matriz (default: 2000)
        // removeTimeout:100,
        //permite al widget ocupar mas de una columna
        //sirve para no inhabilitar el movimiento en pantallas pequeñas
        disableOneColumnMode: true,
        // en falso permite arrastrar a los widget, true lo deniega
        staticGrid: false,
        //para animaciones
        animate: true
    }
    //inicializacion de la matriz
    $('.grid-stack').gridstack(options);

    grid = $('#grid').data('gridstack');

    //Aqui se inicializan los widgets(nuestros barcos) en la matriz
    //.addWidget(elemento,pos x, pos y, ancho, alto) **
    grid.addWidget($('<div id="patrol_boat"><div class="grid-stack-item-content patrol_boatHorizontal"></div><div/>'),
        0, 1, 2, 1);

    grid.addWidget($('<div id="carrier"><div class="grid-stack-item-content carrierHorizontal"></div><div/>'),
        1, 5, 5, 1);

    grid.addWidget($('<div id="battleship"><div class="grid-stack-item-content battleshipHorizontal"></div><div/>'),
        3, 1, 4, 1);

    grid.addWidget($('<div id="submarine"><div class="grid-stack-item-content submarineVertical"></div><div/>'),
        8, 2, 1, 3);

    grid.addWidget($('<div id="destroyer"><div class="grid-stack-item-content destroyerHorizontal"></div><div/>'),
        7, 8, 3, 1);


    //createGrid construye la estructura de la matriz
    createGrid(11, $(".grid-ships"), 'ships')

    //Inicializo los listenener para rotar los barcos, el numero del segundo rgumento
    //representa la cantidad de celdas que ocupa tal barco
    rotateShips("carrier", 5)
    rotateShips("battleship", 4)
    rotateShips("submarine",3)
    rotateShips("destroyer", 3)
    rotateShips("patrol_boat",2)

    listenBusyCells('ships')
    $('.grid-stack').on('change', () => listenBusyCells('ships'))

}


//createGrid construye la estructura de la matriz
/*
size:refiere al tamaño de nuestra grilla (siempre sera una matriz
     de n*n, osea cuadrada)
element: es la tag que contendra nuestra matriz, para este ejemplo
        sera el primer div de nuestro body
id: sera como lo llamamos, en este caso ship ???)
*/
const createGrid = function(size, element, id){
    // definimos un nuevo elemento: <div></div>
    let wrapper = document.createElement('DIV')

    // le agregamos la clase grid-wrapper: <div class="grid-wrapper"></div>
    wrapper.classList.add('grid-wrapper')

    //vamos armando la tabla fila por fila
    for(let i = 0; i < size; i++){
        //row: <div></div>
        let row = document.createElement('DIV')
        //row: <div class="grid-row"></div>
        row.classList.add('grid-row')
        //row: <div id="ship-grid-row0" class="grid-wrapper"></div>
        row.id =`${id}-grid-row${i}`
        /*
        wrapper:
                <div class="grid-wrapper">
                    <div id="ship-grid-row-0" class="grid-row">

                    </div>
                </div>
        */
        wrapper.appendChild(row)

        for(let j = 0; j < size; j++){
            //cell: <div></div>
            let cell = document.createElement('DIV')
            //cell: <div class="grid-cell"></div>
            cell.classList.add('grid-cell')
            //aqui entran mis celdas que ocuparan los barcos
            if(i > 0 && j > 0){
                //cell: <div class="grid-cell" id="ships00"></div>
                cell.id = `${id}${i - 1}${ j - 1}`
            }
            //aqui entran las celdas cabecera de cada fila
            if(j===0 && i > 0){
                // textNode: <span></span>
                let textNode = document.createElement('SPAN')
                /*String.fromCharCode(): método estático que devuelve
                una cadena creada mediante el uso de una secuencia de
                valores Unicode especificada. 64 == @ pero al entrar
                cuando i sea mayor a cero, su primer valor devuelto
                sera "A" (A==65)
                <span>A</span>*/
                textNode.innerText = String.fromCharCode(i+64)
                //cell: <div class="grid-cell" id="ships00"></div>
                cell.appendChild(textNode)
            }
            // aqui entran las celdas cabecera de cada columna
            if(i === 0 && j > 0){
                // textNode: <span>A</span>
                let textNode = document.createElement('SPAN')
                // 1
                textNode.innerText = j
                //<span>1</span>
                cell.appendChild(textNode)
            }
            /*
            row:
                <div id="ship-grid-row0" class="grid-row">
                    <div class="grid-cell"></div>
                </div>
            */
            row.appendChild(cell)
        }
    }

    element.append(wrapper)
}

/*manejador de evento para rotar los barcos, el mismo se ejecuta al hacer click
sobre un barco
function(tipoDeBarco, celda)*/
const rotateShips = function(shipType, cells){

        $(`#${shipType}`).click(function(){
            document.getElementById("alert-text").innerHTML = `Rotaste: ${shipType}`
            console.log($(this))
            //Establecemos nuevos atributos para el widget/barco que giramos
            let x = +($(this).attr('data-gs-x'))
            let y = +($(this).attr('data-gs-y'))
        /*
        this hace referencia al elemento que dispara el evento (osea $(`#${shipType}`))
        .children es una propiedad de sólo lectura que retorna una HTMLCollection "viva"
        de los elementos hijos de un elemento.
        https://developer.mozilla.org/es/docs/Web/API/ParentNode/children
        El método .hasClass() devuelve verdadero si la clase existe como tal en el
        elemento/tag incluso si tal elemento posee mas de una clase.
        https://api.jquery.com/hasClass/
        Consultamos si el barco que queremos girar esta en horizontal
        children consulta por el elemento contenido en "this"(tag que lanza el evento)
        ej:
        <div id="carrier" data-gs-x="0" data-gs-y="3" data-gs-width="5"
        data-gs-height="1" class="grid-stack-item ui-draggable ui-resizable
        ui-resizable-autohide ui-resizable-disabled">
            <div class="grid-stack-item-content carrierHorizontal ui-draggable-handle">
            </div>
            <div></div>
            <div class="ui-resizable-handle ui-resizable-se ui-icon
            ui-icon-gripsmall-diagonal-se" style="z-index: 90; display: none;">
            </div>
        </div>
        */
        if($(this).children().hasClass(`${shipType}Horizontal`)){
            // grid.isAreaEmpty revisa si un array esta vacio**
            // grid.isAreaEmpty(fila, columna, ancho, alto)
        	if(grid.isAreaEmpty(x,y+1,1,cells) || y + cells < 10){
	            if(y + cells - 1 < 10){
                    // grid.resize modifica el tamaño de un array(barco en este caso)**
                    // grid.resize(elemento, ancho, alto)
	                grid.resize($(this),1,cells);
	                $(this).children().removeClass(`${shipType}Horizontal`);
	                $(this).children().addClass(`${shipType}Vertical`);
	            } else{
                        /* grid.update(elemento, fila, columna, ancho, alto)**
                        este metodo actualiza la posicion/tamaño del widget(barco)
                        ya que rotare el barco a vertical, no me interesa el ancho sino
                        el alto
                        */
	            		grid.update($(this), null, 10 - cells)
	                	grid.resize($(this),1,cells);
	                	$(this).children().removeClass(`${shipType}Horizontal`);
	                	$(this).children().addClass(`${shipType}Vertical`);
	            }


            }else{
            		document.getElementById("alert-text").innerHTML = "A ship is blocking the way!"
            }

        //Este bloque se ejecuta si el barco que queremos girar esta en vertical
        }else{

            if(x + cells - 1  < 10){
                grid.resize($(this),cells,1);
                $(this).children().addClass(`${shipType}Horizontal`);
                $(this).children().removeClass(`${shipType}Vertical`);
            } else{
                /*en esta ocasion para el update me interesa el ancho y no el alto
                ya que estoy rotando a horizontal, por estoel tercer argumento no lo
                declaro (que es lo mismo que poner null o undefined)*/
                grid.update($(this), 10 - cells)
                grid.resize($(this),cells,1);
                $(this).children().addClass(`${shipType}Horizontal`);
                $(this).children().removeClass(`${shipType}Vertical`);
            }

        }
    });

}

//Bucle que consulta por todas las celdas para ver si estan ocupadas o no
const listenBusyCells = function(id){
    /* id vendria a ser ships. Recordar el id de las celdas del tablero se arma uniendo
    la palabra ships + fila + columna contando desde 0. Asi la primer celda tendra id
    ships00 */
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            if(!grid.isAreaEmpty(i,j)){
                $(`#${id}${j}${i}`).addClass('busy-cell').removeClass('empty-cell')
            } else{
                $(`#${id}${j}${i}`).removeClass('busy-cell').addClass('empty-cell')
            }
        }
    }
}

//Function to get the parameter by name
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

//Function to get the name of the gamePlayers, the ships and the salvoes. It will assign a class to them so they can be coloured in the table
function loadData(){
    $.get('/api/game_view/'+getParameterByName('gp'))
        .done(function(data) {
            let playerInfo;
            if(data.gamePlayers[0].id == getParameterByName('gp'))
                {playerInfo = [data.gamePlayers[0].player.userName,data.gamePlayers[1].player.userName];}
            else
                {playerInfo = [data.gamePlayers[1].player.userName,data.gamePlayers[0].player.userName];}

            $('#playerInfo').text(playerInfo[0] + '(you) vs ' + playerInfo[1]);

            let arrayLocations =[];
            //Function to apply a class to all the ships and put them in the first table (we do this through the id of the <td>)
            data.ships.forEach(function(ship){
            ship.locations.map(e => arrayLocations.push(e));
                ship.locations.forEach(function(shipLocation){
                    $('#Sh_'+shipLocation).addClass('ship-piece');
                })
            });

            //Function to apply a class (colour) and the number of turn to the salvoes of player 1 and put them in the second table
            data.salvoes.forEach(function(salvo){
            if(data.gamePlayers[0].player.userName,data.gamePlayers[1].id === salvo.player){
                salvo.locations.forEach(function(salvoLocation){
                    $('#Sal_'+salvoLocation).addClass('salvo-piece')
                    $('#Sal_'+salvoLocation).text(salvo.turn);
                });
                }
                else{ //For the salvoes of player 2 we put them in the first table. If the salvo hit a ship (e.g. the location of the salvo is the same as the location of one of the ships in the array arrayLocations), the ship turns purple and the turn number is written in it
                salvo.locations.forEach(function(salvoLocation){
                if(salvoLocation == arrayLocations.find(e => e == salvoLocation)){
                    $('#Sh_'+salvoLocation).addClass('shipHit')
                    $('#Sh_'+salvoLocation).text(salvo.turn);}
                    else{
                    $('#Sh_'+salvoLocation).addClass('salvo-piece')
                    }
                });
                }
            });
        console.log("ships locations: " + arrayLocations);
        })
        .fail(function( jqXHR, textStatus ) {
          alert( "Failed: " + textStatus );
        });
};

function loadData2 (){
fetch("/api/games").then(function (response) {
    if (response.ok) {
      return response.json();
    }
  }).then(function (json) {
    console.log(json);
    chequearUsuario(json.player.email);
  })
  .catch(function (error) {
    console.log("Request failed: " + error.status);
  });
  }

  //Función para que cuando actualice la página no vuelva a aparecer el log in si el usuario ya está loggeado
   function chequearUsuario (usuario){
   if (usuario != undefined){
      $("#player").text("Username: " + usuario);
   }
   }

   //Función para hacer log out
   function logout(evt) {
     evt.preventDefault();
     $.post("/api/logout")
     .done(function (data) {
           console.log("successful logout!!")
           //Redirecciona a la página principal luego de hacer log out
           window.location.replace("http://localhost:8080/web/games2.html");
         })
      .fail(function( jqXHR, textStatus ) {
                          alert( "Failed: " + textStatus );
                        });
   }


//Function to create new ships
function createShips(gpid, newType, newShipLocation ){
    $.post({
    url: "/api/games/players/" + gpid + "/ships",
    data: JSON.stringify([{type: newType, shipLocations: newShipLocation}]),
    dataType: "text",
    contentType: "application/json"
    })
    .done(function (response, status, jqXHR) {
        alert( "Ships added: " + response );
        window.location.reload();
    })
    .fail(function (jqXHR, status, httpError) {
        alert("Failed to add ship: " + httpError);
    })
}

var horizontal = [1,2,3,4,5,6,7,8,9,10];
var vertical = ["A","B","C","D","E","F","G","H","I","J"];


    //Aqui se inicializan los widgets(nuestros barcos) en la matriz
    //.addWidget(elemento,pos x, pos y, ancho, alto) **
    grid.addWidget($('<div id="patrol_boat"><div class="grid-stack-item-content patrol_boatHorizontal"></div><div/>'),
        0, 1, 2, 1);
