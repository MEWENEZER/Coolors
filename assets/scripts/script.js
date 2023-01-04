let cols = document.querySelectorAll('.col');

// function getRandomNumber() {
//   let hexCodes = '0123456789ABCDEF';
//   let color = '';

//   for (let i = 0; i < 6; i++) {
//     color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//   }

//   return '#' + color;
// }

function setRandomColor(isInitial) {
  const colorArray = isInitial ? getColorsFromHash() : []; // Первичная загрузка ? Да : Нет

  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i');
    const title = col.querySelector('div > button:first-child');
    const button = col.querySelector('div > button:last-child');

    const color = isInitial
      ? colorArray[index]
        ? colorArray[index]
        : chroma.random()
      : chroma.random();

    if (isLocked.classList.contains('fa-lock-open')) {
      col.style.background = color;
      title.textContent = color;

      if (!isInitial) {
        colorArray.push(color);
      }

      setTextColor(title, color);
      setTextColor(button, color);
    } else {
      colorArray.push(title.textContent);
    }
  });

  updateColorsHash(colorArray);
}

function setTextColor(element, color) {
  const luminance = chroma(color).luminance();

  if (luminance > 0.5) {
    element.classList.remove('btn-outline-light');
    element.classList.add('btn-outline-dark');
  } else {
    element.classList.remove('btn-outline-dark');
    element.classList.add('btn-outline-light');
  }

  // element.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyColor(text) {
  return navigator.clipboard.writeText(text);
}

function updateColorsHash(colorArray) {
  document.location.hash = colorArray
    .map((cur) => cur.toString().substring(1))
    .join('-');
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((cur) => '#' + cur);
  }
  return [];
}

setRandomColor(true);

// Обработчик клика на 'Пробел'
document.addEventListener('keydown', (event) => {
  event.preventDefault();

  if (event.code == 'Space') {
    setRandomColor();
  }

  // Снятия фокуса при клике на 'Пробел'
  event.target.blur();
});

// Обработчик клика на 'Замок' и 'Заголовок'
document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;

  if (type == 'lock') {
    const node =
      event.target.tagName.toLowerCase() == 'i'
        ? event.target
        : event.target.children[0];

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type == 'copy') {
    const hexCode = event.target.textContent;

    copyColor(hexCode);
  }
});
