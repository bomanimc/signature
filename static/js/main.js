const rectSize = 15;
const maxValueRange = 94;
const socket = io('http://localhost:3000');
const codeSection = document.getElementById("code-section");
const optionsButton = document.getElementById("options-button");
const optionsSheet = document.getElementById("options-sheet");
const optionsClose = document.getElementById("options-close");
const themeSelector = document.getElementById("theme-selector");

function displaySignature() {
  clear();

  const noClass = document.querySelectorAll("span:not([class])");
  const colorToTextMap = [...noClass].map(span => {
    const color = window.getComputedStyle(span).getPropertyValue('color');
    const colorVals = color.match(/\d+/g).map(Number);
    [...span.innerHTML].map((letter, idx) => {
      const normChar = letter.charCodeAt(0) - maxValueRange;
      noStroke();
      fill(...colorVals, 100);
      rect(idx * rectSize, normChar * rectSize, rectSize, rectSize);
    });
  });
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
