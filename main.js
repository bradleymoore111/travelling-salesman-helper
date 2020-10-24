"use strict";

function handlePastedImage(event) {
  console.log(event);
  span.style.color = "black";
  span.innerHTML = "Image Pasted";

  background.src = event.target.result;

  h = true;

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

  const reader = new FileReader();
  reader.onload = function(e) {
    background.src = e.target.result;
    h = true;
  }
  reader.readAsDataURL(file.files[0]);
}
file.onchange = handleFile;

// Initially size the canvas
resize();

// Start the loop
frame();

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

