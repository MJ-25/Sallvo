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
  chequearUsuario();
});

var error = "";
var usuario;
//Obtener Json desde /api/games y colocarlo en e html
function loadData (){
fetch("/api/games").then(function (response) {
    if (response.ok) {
      return response.json();
    }
  }).then(function (json) {
    document.getElementById("lista").innerHTML = json.games.map(listOfGameDates).join("");
    console.log(json);
    usuario = json.player.email;
    console.log(usuario);


  })
  .catch(function (error) {
    console.log("Request failed: " + error.message);
  });
  }

//Crear la lista para poner en el html
function listOfGameDates(game) {
  return "<li class='collection-item deep-orange darken-3'> Horario: " + game.created + "   Jugadores: " + game.gamePlayers.map(emails) + "</li>"
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
        console.log(usuario);
        $("#player").text("Welcome " + usuario + "!");
     })
     .fail(function( jqXHR, textStatus ) {
        error = jqXHR.status;
        alert( "Failed: " + error );
        //Terminar de poner los otros errores
        if (error == 401){
           $("#wrongInfo").show();
        }
        });
    };


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
                    $("#player").text("Welcome " + form["name"].value + "!");
                })
      })
       .fail(function( jqXHR, textStatus ) {
                alert( "Failed: " + jqXHR.text );
              });
 };


 function chequearUsuario (){
 if (usuario != undefined){
    showLogin(false);
    $("#player").text("Welcome " + usuario + "!");
 }
 }

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
