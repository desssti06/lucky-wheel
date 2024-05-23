const names = [];
const nameInput = document.getElementById('kaliInput');
const nameList = document.getElementById('kaliList');

document.getElementById('addkaliButton').addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        names.push(name);
        nameInput.value = '';
        updateNameList();
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    if (names.length === 0) {
        alert('Please add at least one name.');
        return;
    }
    localStorage.setItem('names', JSON.stringify(names));
    window.location.href = 'wheel.html';
});

function updateNameList() {
    nameList.innerHTML = '';
    names.forEach(name => {
        nameList.textContent = names.join(', ');
    });
}

function tampilkanCash() {
    var inputCash = document.getElementById("inputCash").value;
    document.getElementById("cash").innerHTML = inputCash || '000';
    checkCashOutstanding();
    localStorage.setItem("inputCash", inputCash);
}

function tampilkanOutstanding() {
    var cash = parseFloat(document.getElementById("cash").innerHTML) || 0;
    var inputOutstanding = document.getElementById("inputOutstanding").value;
    var outstanding = parseFloat(inputOutstanding);
    if (outstanding > cash) {
        alert("Cash is less than outstanding!");
    } else {
        document.getElementById("outstanding").innerHTML = inputOutstanding || '000';
        checkCashOutstanding();
        localStorage.setItem("inputOutstanding", inputOutstanding);
    }
}

function checkCashOutstanding() {
    var cash = parseFloat(document.getElementById("cash").innerHTML) || 0;
    var outstanding = parseFloat(document.getElementById("outstanding").innerHTML) || 0;
    var playButton = document.getElementById("playButton");
    if (cash >= outstanding) {
        playButton.style.display = "block";
    } else {
        playButton.style.display = "none";
    }
}

function playWheel() {
    if (names.length === 0) {
        alert('Please add at least one name.');
        return;
    }
    localStorage.setItem('names', JSON.stringify(names));
    window.location.href = "play-page.html";
}

function initializeValues() {
    const elements = ['cash', 'outstanding'];
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (!element.innerHTML.trim()) {
            element.innerHTML = '000';
        }
    });
}
