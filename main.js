const myCanvas = document.getElementById("myCanvas").getContext("2d");
const colorsBox = document.getElementById("colorsBox");

let colors = [];
let currentColor = 'black';

function loadColors() {
    const json = localStorage.getItem("colors");
    if (!json) return;
    colors = JSON.parse(json);
    drawColorBox();
}

//Add color to colorBox
function addRandomColor() {
    const newColor = getRandomColor();
    colors.push(newColor);
    drawColorBox();
    saveColors();
}

function drawColorBox() {
    let html = '';
    for (let i = 0; i < colors.length; i++) {
        html += `<div class="color" id="${i}" style="background-color:${colors[i]};" onclick="changeColor('${colors[i]}')"></div>`;
    }
    document.getElementById('colorsBox').innerHTML = html;
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = `rgb(${r},${g},${b})`;
    return color;
}

function changeColor(color) {
    currentColor = color;
    myCanvas.strokeStyle = color;
}

//Start new drawing
function mark(event) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    myCanvas.beginPath();
    myCanvas.moveTo(x, y);

}

// Paint while left-button is clicked:
function paint(event) {
    if (event.buttons !== 1) return;
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    myCanvas.lineTo(x, y);
    myCanvas.stroke();
}

function changeThickness(thickNess) {
    myCanvas.lineWidth = thickNess;
}

function clearCanvas() {
    myCanvas.clearRect(0, 0, 600, 400);
}

function randomLetter() {

    clearCanvas();
    const char = getRandomLetter();
    const fontSize = Math.min(myCanvas.canvas.width, myCanvas.canvas.height) * 0.8;
    myCanvas.font = `${fontSize}px Arial`;
    myCanvas.textBaseline = 'middle';
    myCanvas.textAlign = 'center';
    myCanvas.strokeStyle = currentColor;
    myCanvas.strokeText(char, myCanvas.canvas.width / 2, myCanvas.canvas.height / 2);

}

function getRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randIndex = Math.floor(Math.random() * letters.length );
    const char = letters[randIndex]; 
    return char;
}

function clearColors() {
    colors = [];
    currentColor = 'black';
    myCanvas.strokeStyle = 'black';
    drawColorBox();
    saveColors();
}

function saveColors() {
    const json = JSON.stringify(colors); 
    localStorage.setItem("colors", json);
}