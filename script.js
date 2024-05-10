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