let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 10000);

let flash = document.querySelector(".container div");

btn.onclick = function () {
    number = Math.floor(Math.random() * 360) + 3600; // Jumlah putaran yang ditambahkan (10 putaran)
    container.style.transition = "all 10s ease-out";
    container.style.transform = "rotate(" + number + "deg)";
    }

    var userInput = localStorage.getItem("inputCash");
    // Menampilkan nilai input pengguna di halaman ini
    document.getElementById("cash").innerHTML = "" + inputCash;

// Mendapatkan nilai input pengguna yang disimpan di localStorage
var userInput = localStorage.getItem("inputCash");
// Menampilkan nilai input pengguna di halaman ini
document.getElementById("cash").innerHTML = " " + userInput;

 // Mendapatkan nilai input pengguna yang disimpan di localStorage
 var userInput = localStorage.getItem("inputOutstanding");
// Menampilkan nilai input pengguna di halaman ini
document.getElementById("outstanding").innerHTML = " " + userInput;