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
    const isLocked = col.querySelector('i');
    const title = col.querySelector('.title');
    const button = col.querySelector('.button');
    const color = chroma.random();

    if (isLocked.classList.contains('fa-lock-open')) {
      col.style.background = color;
      title.textContent = color;

      setTextColor(title, color);
      setTextColor(button, color);
    }
  });
}

function setTextColor(element, color) {
  const luminance = chroma(color).luminance();
  element.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColor();

// Обработчик клика на 'Пробел'
document.addEventListener('keydown', (event) => {
  event.preventDefault();

  if (event.code == 'Space') {
    setRandomColor();
  }
});

// Обработчик клика на 'Замок'
document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;

  if (type == 'lock') {
    const node =
      event.target.tagName.toLowerCase() == 'i'
        ? event.target
        : event.target.children[0];

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  }
});
