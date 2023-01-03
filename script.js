let cols = document.querySelectorAll('.col');

// function getRandomNumber() {
//   let hexCodes = '0123456789ABCDEF';
//   let color = '';

//   for (let i = 0; i < 6; i++) {
//     color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//   }

//   return '#' + color;
// }

function setRandomColor() {
  cols.forEach((col) => {
    const title = col.querySelector('.title');
    const color = chroma.random();

    col.style.background = color;
    title.textContent = color;

    setTextColor(title, color);
  });
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColor();

document.addEventListener('keydown', function (event) {
  if (event.code == 'Space') {
    setRandomColor();
  }
});
