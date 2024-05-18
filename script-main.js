function tampilkanCash() {
    var inputCash = document.getElementById("inputCash").value;
    document.getElementById("cash").innerHTML = inputCash;
    checkCashOutstanding();
    // Menyimpan nilai input pengguna di localStorage agar dapat diakses di halaman berikutnya
    localStorage.setItem("inputCash", inputCash);
    }
    
    function tampilkanOutstanding() {
    var cash = parseFloat(document.getElementById("cash").innerHTML);
    var inputOutstanding = document.getElementById("inputOutstanding").value;
    var outstanding = parseFloat(inputOutstanding);
    if (outstanding > cash) {
        alert("Cash is less than outstanding!");
    } else {
        document.getElementById("outstanding").innerHTML = inputOutstanding;
        checkCashOutstanding();
        localStorage.setItem("inputOutstanding",inputOutstanding);
    }
    }
    
    function checkCashOutstanding() {
    var cash = parseFloat(document.getElementById("cash").innerHTML);
    var outstanding = parseFloat(document.getElementById("outstanding").innerHTML);
    var playButton = document.getElementById("playButton");
    if (cash >= outstanding) {
        playButton.style.display = "block"; // Menampilkan button "play" jika kondisi terpenuhi
    } else {
        playButton.style.display = "none"; // Menyembunyikan button "play" jika kondisi tidak terpenuhi
    }
    }
    
    function playWheel() {
    // Logika untuk memulai putaran wheel
    window.location.href = "play-page.html";
    }