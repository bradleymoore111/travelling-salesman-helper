"use strict";

const canvas = document.getElementById("canvas");
const file = document.getElementById("file");
const span = document.getElementById("pasted-image");
canvas.width = 0.8 * window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = 0.8 * window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;


function handlePastedImage(event) {
  console.log(event);
  span.style.color = "black";
  span.innerHTML = "Image Pasted";

  // Clear the file input
  file.value = '';
  file.style.color = "grey";
}

function handleFile(event) {
  if (file.value) {
    span.style.color = "grey";
    span.innerHTML = "No Image Given";
  }

  file.style.color = "black";

  console.log(file);
}
file.onchange = handleFile;

function getCursorPosition(event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round(event.clientX - rect.left);
  const y = Math.round(event.clientY - rect.top);
  if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
    return [-1, -1];
  }

  console.log(x, y);

  return [x, y];
}

let tempClick = null;

function mouseDown(event) {
  if (!tempClick) {
    return;
  }
  const coords = getCursorPosition(event);

  if (coords[0] == -1 || coords[1] == -1) {
    console.log("Clearing");
    tempClick = null;
  } else {
    console.log("Setting");
    tempClick = coords;
  }
}
canvas.addEventListener('mousedown', function(event) {
  tempClick = true;
  mouseDown(event);
});
canvas.addEventListener('mousemove', function(event) {
  mouseDown(event);
});

function mouseUp() {
  // TODO add to list of points.
  tempClick = false;
}
window.addEventListener('mouseup', function(event) {
  mouseUp();
});

// Credit to https://stackoverflow.com/a/6338207/13372610
document.onpaste = function(event){
  var items = (event.clipboardData || event.originalEvent.clipboardData).items;
  console.log(JSON.stringify(items)); // will give you the mime types
  for (let index in items) {
    var item = items[index];
    if (item.kind === 'file') {
      var blob = item.getAsFile();
      var reader = new FileReader();
      reader.onload = handlePastedImage;
      reader.readAsDataURL(blob);
    }
  }
}

console.log(canvas);
