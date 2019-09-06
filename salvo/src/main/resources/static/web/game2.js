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

var column;

function getBodySalvo(){
var body = "";
var headers = "";
var j;
var i;
for (j=0; j<=horizontal.length-1; j++)
     {
        headers += "<td></td>";
     }
for (i=0; i<=vertical.length-1; i++)
{
//    body += "<tr><td>" + vertical[i] + "</td>";
  //  body += headers + "</tr>";

    body += "<tr><td>" + vertical[i] + "</td>" + headers + "</tr>";
}
 return body;
}

function renderBodySalvo(){
var html2 = getBodySalvo();
document.getElementById("bodySalvo").innerHTML = html2;
}

renderBodySalvo();