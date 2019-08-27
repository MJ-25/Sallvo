fetch( "/api/games").then(function(response) {
  if(response.ok){
  return response.json();
  }
}).then(function(json){
document.getElementById("lista").innerHTML = json.map(listOfGameDates).join("");
console.log(json);

//json[0].gamePlayers[0].player.email
})
.catch(function(error) {
  console.log( "Request failed: " + error.message );
});


function listOfGameDates(game){
return "<li class='list-group-item'> Horario: " + game.created + "   Jugadores: "+ game.gamePlayers.map(emails) + "</li>"
}

function emails (cosa){
var mails = " " + cosa.player.email;
return mails;
}