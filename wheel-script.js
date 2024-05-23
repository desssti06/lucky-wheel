const names = JSON.parse(localStorage.getItem('names')) || [];
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
let startAngle = 0;
let spinTimeout = null;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;
let resultNumber = 0;  // Inisialisasi variabel resultNumber

document.getElementById('spinButton').addEventListener('click', spin);
document.querySelector('.close-button').addEventListener('click', closeModal);

function drawWheel() {
    const outsideRadius = 200;
    const textRadius = 100;
    const insideRadius = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const numSegments = names.length;
    const angle = 2 * Math.PI / numSegments;
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF8333', '#FF3387'];

    for (let i = 0; i < numSegments; i++) {
        const angleStart = startAngle + i * angle;
        const angleEnd = startAngle + (i + 1) * angle;
        ctx.fillStyle = colors[i % colors.length];

        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angleStart, angleEnd, false);
        ctx.arc(250, 250, insideRadius, angleEnd, angleStart, true);
        ctx.fill();

        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.translate(250 + Math.cos(angleStart + angle / 2) * textRadius, 250 + Math.sin(angleStart + angle / 2) * textRadius);
        ctx.rotate(angleStart + angle / 2 + Math.PI / 2);
        ctx.fillText(names[i], -ctx.measureText(names[i]).width / 2, 0);
        ctx.restore();
    }
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = 360 / names.length;
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    resultNumber = names[index];  // Simpan hasil roda

    // Tambahkan penanganan jika hasilnya "zonk"
    if (resultNumber === "zonk") {
        const modal = document.getElementById('winnerModal');
        const winnerText = document.getElementById('winnerText');

        // Mendapatkan nilai cash dan outstanding dari localStorage
        let cash = parseFloat(localStorage.getItem("inputCash")) || 0;
        let outstanding = parseFloat(localStorage.getItem("inputOutstanding")) || 0;

        // Kurangkan sejumlah taruhan/outstanding
        cash -= outstanding;

        // Tampilkan pesan bahwa pengguna berhenti pada "zonk"
        winnerText.textContent = `Oops! You stopped at zonk. You lost ${outstanding.toFixed(2)} from your cash. Your new cash balance is ${cash.toFixed(2)}.`;
        modal.style.display = 'block';

        // Perbarui tampilan cash di header
        document.getElementById('cash').textContent = cash.toFixed(2);

        // Perbarui cash di localStorage
        localStorage.setItem("inputCash", cash);
    } else {
        // Jika bukan "zonk", tampilkan pemenang seperti biasa
        showWinner(resultNumber);
    }
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

function spin() {
    if (names.length === 0) {
        alert('Please add at least one name.');
        return;
    }
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotateWheel();
}

function showWinner(resultNumber) {
    const modal = document.getElementById('winnerModal');
    const winnerText = document.getElementById('winnerText');

    // Mendapatkan nilai cash dan outstanding dari localStorage
    let cash = parseFloat(localStorage.getItem("inputCash")) || 0;
    let outstanding = parseFloat(localStorage.getItem("inputOutstanding")) || 0;

    let totalPrize = resultNumber * outstanding;

    // Tampilkan pesan pemenang
    winnerText.textContent = `Congratulations! The wheel stopped at ${resultNumber}. You will win ${totalPrize.toFixed(2)} cash when you close this message.`;
    modal.style.display = 'block';

    // Tampilkan hasil di elemen dengan id 'earn'
    document.getElementById('earn').textContent = totalPrize.toFixed(2);
}

function closeModal(event) {
    event.preventDefault();  // Pastikan tidak ada perilaku default yang menyebabkan refresh
    const modal = document.getElementById('winnerModal');
    modal.style.display = 'none';

    // Mendapatkan nilai cash dan outstanding dari localStorage
    let cash = parseFloat(localStorage.getItem("inputCash")) || 0;
    let outstanding = parseFloat(localStorage.getItem("inputOutstanding")) || 0;

    // Cek apakah resultNumber adalah "zonk"
    if (resultNumber === "zonk") {
        // Kurangi cash dengan outstanding
        cash -= outstanding;
    } else {
        // Hitung total hadiah
        let totalPrize = resultNumber * outstanding;

        // Tambahkan total hadiah ke cash
        cash += totalPrize;
    }

    // Perbarui cash di localStorage
    localStorage.setItem("inputCash", cash.toFixed(2));

    // Perbarui tampilan cash di header
    document.getElementById('cash').textContent = cash.toFixed(2);

    // Refresh halaman
    setTimeout(() => location.reload(), 100); // Berikan jeda singkat sebelum refresh
}

drawWheel();
