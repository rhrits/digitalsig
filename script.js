// Your existing JavaScript code

const canvas = document.getElementById("signatureCanvas");
const clearButton = document.getElementById("clearButton");
const downloadButton = document.getElementById("downloadButton");
const colorButtons = document.querySelectorAll(".colorButton");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#000"; // Initial color
ctx.lineWidth = 2;

let painting = false;

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineCap = "round";
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", endPosition);
canvas.addEventListener("touchmove", draw);

colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedColor = button.getAttribute("data-color");
        ctx.strokeStyle = selectedColor;
    });
});

clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

downloadButton.addEventListener("click", () => {
    const signatureImage = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = signatureImage;
    downloadLink.download = "signature.png";
    downloadLink.click();
});

