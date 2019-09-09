$(function() {
    loadData();
});

var horizontal = [1,2,3,4,5,6,7,8,9,10];
var vertical = ["A","B","C","D","E","F","G","H","I","J"];

function getHeaderSalvo(){
var headers = "<th></th>";
var i;
for (i=0; i<=horizontal.length-1; i++){
headers += "<th>" + horizontal[i] + "</th>";
}
return headers;
}


function renderHeadersSalvo(){
var html = getHeaderSalvo();
document.getElementById("headSalvo").innerHTML = html;
}

renderHeadersSalvo();


function getBodySalvo(){
var body = "";
var headers = "";
var j;
var i=0;
for (i=0; i<=vertical.length-1; i++)
    {
        body += "<tr><td>" + vertical[i] + "</td>";
         for (j=0; j<=horizontal.length-1; j++)
              {
                 body += "<td id='" + vertical[i] + horizontal[j]+ "'></td>";
              }
         body += "</tr>";
    }
 return body;
}


function renderBodySalvo(){
var html2 = getBodySalvo();
document.getElementById("bodySalvo").innerHTML = html2;
}

renderBodySalvo();

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

function loadData(){
    $.get('/api/game_view/'+getParameterByName('gp'))
        .done(function(data) {
            let playerInfo;
            if(data.gamePlayers[0].id == getParameterByName('gp'))
                {playerInfo = [data.gamePlayers[0].player.userName,data.gamePlayers[1].player.userName];}
            else
                {playerInfo = [data.gamePlayers[1].player.userName,data.gamePlayers[0].player.userName];}

            $('#playerInfo').text(playerInfo[0] + '(you) vs ' + playerInfo[1]);

            data.ships.forEach(function(ship){
            console.log(ship);
                ship.locations.forEach(function(shipLocation){
                    $('#'+shipLocation).addClass('ship-piece');
                })
            });
        })
        .fail(function( jqXHR, textStatus ) {
          alert( "Failed: " + textStatus );
        });
};

