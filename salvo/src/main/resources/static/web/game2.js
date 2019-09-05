function getHeaderSalvo(){
var headers = "";
var i;
for (i=0; i<=10; i++){
headers += "<th>" + i + "</th>";
}
return headers;
}


function renderHeadersSalvo(){
var html = getHeaderSalvo();
document.getElementById("headSalvo").innerHTML = html;
}

renderHeadersSalvo();
/*
var column;

function getBodySalvo(){
var body = "";
var i;
for (i=0; i<=10; i++){
body += "<td>" +
}*/
}
