function asciiStructure() {
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
