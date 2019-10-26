$(function () {
  $("#logout-btn").hide();
  $("#login-btn").click(function () {
    login(event);
  });
   $("#signin-btn").click(function () {
        signin(event);
      });
  $("#logout-btn").click(function () {
    logout(event);
  });
     loadData();

});

var error = "";
var playerId = "";
var gamePlayers = "";


//Obtener Json desde /api/games y colocarlo en el html
function loadData (){
fetch("/api/games").then(function (response) {
    if (response.ok) {
      return response.json();
    }
  }).then(function (json) {
  //Id de player loggeado
    playerId = json.player.Id;
    //Crea un botón para cada uno de los juegos en que un jugador se puede unir al juego
    gamePlayers = json.games.map(createButtonJoinGame);
    document.getElementById("lista").innerHTML = json.games.map(listOfGameDates).join("");
    chequearUsuario(json.player.email);
    })
  .catch(function (error) {
    console.log("Request failed: " + error.message);
  });
  }


var idsDeGamePlayers = [];
var buttonJoinGame = "";



function createButtonJoinGame (game){
console.log(game.gamePlayers[0].player.idPlayer);
if(game.gamePlayers[0].player.idPlayer == playerId){
console.log("yes");
buttonJoinGame = "<a id='joinGameButton' href= 'http://localhost:8080/web/game2.html?gp="+ game.gamePlayers[0].idGamePlayer +"'>Join Game! </a>";
//$("#joinGameButton").show();
}/*else if(game.gamePlayers[1].player.idPlayer == playerId){
buttonJoinGame = "<a id='joinGameButton' href= 'http://localhost:8080/web/game2.html?gp="+ game.gamePlayers[1].idGamePlayer +"'>Join Game! </a>";
}*/
else{
console.log("no");
//$("#joinGameButton").hide();
//buttonJoinGame = "";
}}


//Crear la lista para poner en el html
function listOfGameDates(game) {
  return "<li class='collection-item deep-orange darken-3'> Horario: " + game.created + "   Jugadores: " + game.gamePlayers.map(emails) + buttonJoinGame + "</li>";
}

function emails(e) {
  var mails = " " + e.player.email;
  return mails;
}

//Obtiene Json desde /api/leaderBoard y lo pone en el html
fetch("/api/leaderBoard").then(function (response) {
    if (response.ok) {
      return response.json();
    }
  }).then(function (json) {
    document.getElementById("bodyLeaderBoard").innerHTML = json.map(tableBody).join("");
    console.log(json);
    $("#blankField").hide();
    $("#wrongInfo").hide();
    $("#usedUser").hide();

  })
  .catch(function (error) {
    console.log("Request failed: " + error.message);
  });


//Crea el contenido que va adentro de la tabla
function tableBody(e) {
  return "<tr><td>" + e.email +
    "</td><td>" + e.score.total +
    "</td><td>" + e.score.won +
    "</td><td>" + e.score.lost +
    "</td><td>" + e.score.tied +
    "</td><td>" + e.score.gamesPlayed +
    "</td></tr>";
}

//Función para hacer log in
function login(evt) {
  evt.preventDefault();
  var form = evt.target.form;
  console.log(form)
  $.post("/api/login", {
      name: form["name"].value,
      password: form["password"].value
    })
    .done(function (data) {
        console.log("successful login!!");
        showLogin(false);
        loadData();
     })
     .fail(function( jqXHR, textStatus ) {
        error = jqXHR.status;
        if (error == 401){
           $("#wrongInfo").show();
           $("#usedUser").hide();
           $("#blankField").hide();
        }
        });
    };

//Función para hacer sign in
function signin (evt){
evt.preventDefault();
  var form = evt.target.form;
  console.log(form)
  $.post("/api/players", {
  email: form["name"].value,
  password: form["password"].value
  })
  .done(function (data) {
        console.log("successful sign in!!");
         $.post("/api/login", {
              name: form["name"].value,
              password: form["password"].value
            })
            .done(function (data) {
                  console.log("successful login!!");
                    showLogin(false);
                    loadData();
                })
      })
       .fail(function( jqXHR, textStatus ) {
                alert( "Failed: " + jqXHR.status );

                error = jqXHR.status;
                        if (error == 400){
                           $("#blankField").show();
                           $("#wrongInfo").hide();
                            $("#usedUser").hide();
                        };
                        if (error == 403){
                           $("#usedUser").show();
                           $("#blankField").hide();
                           $("#wrongInfo").hide();
                        };
              });
 };

//Función para que cuando actualice la página no vuelva a aparecer el log in si el usuario ya está loggeado
 function chequearUsuario (usuario){
 if (usuario != undefined){
    showLogin(false);
    $("#player").text("Welcome " + usuario + "!");
 }
 }

//Función para hacer log out
function logout(evt) {
  evt.preventDefault();
  $.post("/api/logout")
  .done(function (data) {
        console.log("successful logout!!"),
          showLogin(true);
      })
   .fail(function( jqXHR, textStatus ) {
                       alert( "Failed: " + textStatus );
                     });
}

//Función para que una vez hecho el log in desaparezca el form para hacer log in y aparezca el de log out
function showLogin(show) {
  if (show) {
    $("#login-info").show();
    $("#login-btn").show();
    $("#signin-btn").show();
    $("#logout-btn").hide();
    $("#player").hide();
  } else {
    $("#logout-btn").show();
    $("#login-info").hide();
    $("#signin-btn").hide();
    $("#login-btn").hide();
    $("#player").show();
    $("#blankField").hide();
    $("#wrongInfo").hide();
    $("#usedUser").hide();
  }
}
