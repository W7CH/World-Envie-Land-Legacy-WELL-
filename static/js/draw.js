// get the canvas element
var canvas = document.getElementById("canvas");
let fontText = document.getElementById("font");
let textInput = document.getElementById('text-input');
let addTextButton = document.getElementById('add-text-button');
let uploadImage = document.getElementById('upload-image');
let addImageButton = document.getElementById('add-image-button');

// set up the variables
var isDrawing = false;
var lastX = 0;
var lastY = 0;
let fontSize = 24;
let isDraggingText = false;
let isTyping = false;
let textX, textY;
let isDraggingImage = false;
let isResizingImage = false;
let imageX, imageY;
let startX, startY, initialWidth, initialHeight;
let imgX = 0, imgY = 0, imgWidth, imgHeight;

// set up the context for the canvas
var context = canvas.getContext("2d");

// set the default brush color and size
context.strokeStyle = "#000000";
context.lineWidth = 10;

// get the color picker and brush size elements
var colorPicker = document.getElementById("color-picker");
var brushSize = document.getElementById("brush-size");

// add an event listener for the color picker
colorPicker.addEventListener("input", function () {
  context.strokeStyle = colorPicker.value;
});

// add an event listener for the brush size
brushSize.addEventListener("input", function () {
  context.lineWidth = brushSize.value;
});

// add an event listener for the clear button
var clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

// add event listeners for the mouse movements
canvas.addEventListener("mousedown", function (e) {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mousemove", function (e) {
  if (isDrawing) {
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener("mouseup", function () {
  isDrawing = false;
});


addTextButton.addEventListener('click', () => {
      isTyping = true;
      let text = textInput.value;
      let div = document.createElement('div');
      div.innerText = text;
      div.style.position = 'absolute';
      div.style.top = '100px';
      div.style.left = '100px';
      div.style.fontSize = '30px';
      div.style.fontFamily = fontText.value;
      div.style.color = colorPicker.value;
      document.getElementById('text-container').appendChild(div);

      div.addEventListener("input", function () {
        wrapText(context, text, textX, textY, canvas.width - 20, fontSize + 10);
      });
});

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    let words = text.split(" ");
    let line = "";
    context.font = fontSize + "px sans-serif";
    context.fillStyle = fontColor;
  
    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + " ";
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && i > 0) {
        context.fillText(line, x, y);
        line = words[i] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
}

addImageButton.addEventListener('click', () => {
      let file = uploadImage.files[0];
      let reader = new FileReader();
      reader.onload = () => {
          let img = new Image();
          img.onload = () => {
              let width = img.width;
              let height = img.height;
              let aspectRatio = width / height;
              let canvasAspectRatio = canvas.width / canvas.height;
              let imgWidth = canvas.width / 2;
              let imgHeight = imgWidth / aspectRatio;

              // Draw the image onto the canvas
              addImageToCanvas(img, canvas.width / 4, canvas.height / 4, imgWidth, imgHeight);
          };
          img.src = reader.result;
      };
      reader.readAsDataURL(file);
});

function addImageToCanvas(img, x, y, w, h) {
    context.drawImage(img, x, y, w, h);

    canvas.addEventListener('mousedown', handleMouseDown, false);
    canvas.addEventListener('mouseup', handleMouseUp, false);
    canvas.addEventListener('mousemove', handleMouseMove, false);

    function handleMouseDown(e) {
        const mouseX = e.clientX - canvas.offsetLeft;
        const mouseY = e.clientY - canvas.offsetTop;
        // check if the click was on the image
        if (mouseX > imgX && mouseX < imgX + imgWidth && mouseY > imgY && mouseY < imgY + imgHeight) {
            isDraggingImage = true;
            // calculate the initial position and size of the image
            startX = mouseX;
            startY = mouseY;
            initialWidth = imgWidth;
            initialHeight = imgHeight;
        }
        // check if the click was on the resize handle
        if (mouseX > imgX + imgWidth - 10 && mouseX < imgX + imgWidth && mouseY > imgY + imgHeight - 10 && mouseY < imgY + imgHeight) {
            isResizingImage = true;
        }
    }

    function handleMouseUp(e) {
        isDrawing = false
        isDraggingImage = false;
        isResizingImage = false;
    }

    function handleMouseMove(e) {
        if (isDrawing) {
            context.beginPath();
            context.moveTo(lastX, lastY);
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
            lastX = e.offsetX;
            lastY = e.offsetY;
        }
        if (isDraggingImage) {
            const mouseX = e.clientX - canvas.offsetLeft;
            const mouseY = e.clientY - canvas.offsetTop;
            // calculate the new position of the image based on the drag distance
            const dx = mouseX - startX;
            const dy = mouseY - startY;
            imgX += dx;
            imgY += dy;
            redrawImage();
        }
        if (isResizingImage) {
            const mouseX = e.clientX - canvas.offsetLeft;
            const mouseY = e.clientY - canvas.offsetTop;
            // calculate the new size of the image based on the resize distance
            const dw = mouseX - imgX - imgWidth;
            const dh = mouseY - imgY - imgHeight;
            imgWidth += dw;
            imgHeight += dh;
            redrawImage();
        }
    }

    function redrawImage() {
        // clear the canvas and redraw the image
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, imgX, imgY, imgWidth, imgHeight);

        // draw the resize handle
        context.fillStyle = 'white';
        context.fillRect(imgX + imgWidth - 10, imgY + imgHeight - 10, 10, 10);
        context.strokeStyle = 'black';
        context.strokeRect(imgX + imgWidth - 10, imgY + imgHeight - 10, 10, 10);
    }
}

let saveButton = document.getElementById("downloadButton");
saveButton.addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = "tshirt.png";
  link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  link.click();
});
