const rectSize = 20;
const maxValueRange = 94;
const socket = io('http://localhost:3000');
const codeSection = document.getElementById("code-section");
const optionsButton = document.getElementById("options-button");
const optionsSheet = document.getElementById("options-sheet");
const optionsClose = document.getElementById("options-close");
const themeSelector = document.getElementById("theme-selector");
const vizSelector = document.getElementById("viz-selector");

function displaySignature() {
  clear();

  switch (vizSelector.value) {
    case 'ascii-structure':
      asciiStructure();
      break;
  }
}

function getCanvasDimensions() {
  const signatureCanvas = document.getElementById("signature-canvas");
  return {
    width: signatureCanvas.offsetWidth,
    height: signatureCanvas.offsetHeight,
  };
}

socket.on('sendCode', function (data) {
  codeSection.innerHTML = data.html;
  displaySignature();
});

optionsButton.addEventListener('click', () => {
  optionsSheet.classList.toggle('option-sheet-hidden');
});

optionsClose.addEventListener('click', () => {
  optionsSheet.classList.toggle('option-sheet-hidden');
});

themeSelector.addEventListener('change', () => {
  const themes = document.querySelectorAll('.alternate');
  themes.forEach(theme => {
    if (theme.classList.contains(themeSelector.value)) {
      theme.disabled = false;
    } else {
      theme.disabled = true;
    }
  });

  displaySignature();
});

vizSelector.addEventListener('change', () => {
  displaySignature();
});

// --------- P5 Sketch Functions ------------

function setup() {
  const dimensions = getCanvasDimensions();
  const canvas = createCanvas(dimensions.width, dimensions.height);
  canvas.parent('signature-canvas');
  background(0, 0, 0);
}

function windowResized(){
  const dimensions = getCanvasDimensions();
  resizeCanvas(dimensions.width, dimensions.height);
  displaySignature();
}
