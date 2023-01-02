let cols = document.querySelectorAll('.col');

function getRandomNumber() {
  let hexCodes = '0123456789ABCDEF';
  let color = '';

  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }

  return '#' + color;
}

function setRandomColor() {
  cols.forEach((col) => {
    col.style.background = getRandomNumber();

    const title = col.querySelector('.title');
    const color = getRandomNumber();

    title.textContent = color;
  });
}

setRandomColor();

document.addEventListener('keydown', function (event) {
  if (event.code == 'Space') {
    setRandomColor();
  }
});
