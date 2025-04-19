const content = document.querySelector(".content");

const p1 = document.createElement("p");
p1.textContent = "Nay toi mau do";
p1.style.color = "red";
content.appendChild(p1);

const h3 = document.createElement("h3");
h3.textContent = "Toi la h3 mau xanh";
h3.style.color = "blue";
content.appendChild(h3);

var div = document.createElement("div");
div.style.border = "1px solid black";
div.style.backgroundColor = "pink";
div.style.padding = "20px";
content.appendChild(div);
var h1 = document.createElement("h1");
h1.textContent = "Toi dang o trong 1 the div";
div.appendChild(h1);
var p2 = document.createElement("p");
p2.textContent = "Toi cung vay";
div.appendChild(p2);
