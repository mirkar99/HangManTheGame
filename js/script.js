const header = document.querySelector('.header');
//Menu Section
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu__button');
//Main Element
const main = document.querySelector('.main');
const imgPanel = [...document.querySelectorAll('.panel__img')];
const vievText = document.querySelector('.viev__text');
const gameText = document.querySelector('.game__text');
const letterButtons = [...document.querySelectorAll('.game__button')];
//EndMenu section
const endMenu = document.querySelector('.endMenu');
const restetBtn = document.querySelector('.endMenu__button--reset');
const goBackBtn = document.querySelector('.endMenu__button--goBack');

const wordBase = [
  ['B', 'R', 'E', 'A', 'D'], ['I', 'C', 'E'], ['F', 'I', 'R', 'E'], ['S', 'T', 'A', 'T', 'U', 'E'],
  ['B', 'A', 'L', 'L'], ['V', 'I', 'E', 'W'], ['N', 'I', 'G', 'H', 'T'], ['D', 'A', 'Y'], ['L', 'A', 'M', 'P'],
  ['B', 'O', 'O', 'K'], ['L', 'I', 'Z', 'A', 'R', 'D'], ['D', 'O', 'G'], ['C', 'A', 'T'], ['H', 'O', 'R', 'S', 'E']
];

const currentWord = [];
const hiddenWord = [];
const takeWordFromApi = (a) => {
  return fetch("https://random-word-api.herokuapp.com/word")
    .then(res => res.json())
    .then(data => a.push([...data[0].toUpperCase()]))
    .catch(err => {
      console.clear();
      console.log(`Error ${err}`);
      return false;
    }
    )
}

//Change section elements
const changeHeaderSection = function (headerTop) {
  header.style.top = headerTop;
}
const changeMenuSection = function () {
  menu.classList.toggle('hidden');
};
const changeGameSection = function (removeClassHidden) {
  main.classList.add("hidden");
  imgPanel.forEach((el, i) => {
    if (i > 0) {
      el.classList.add('hidden');
    }
  })
  letterButtons.forEach((el) => {
    if (el.classList.contains('hidden')) {
      el.classList.remove('hidden');
    }
  });
  if (removeClassHidden == true) {
    main.classList.remove("hidden");
  }
};
const changeEndMenu = function (removeClassHidden) {
  endMenu.classList.add('hidden');
  if (removeClassHidden == true) {
    endMenu.classList.remove('hidden');
  }
};
//Game elements
const wordToHtml = async function () {
  const wordArry = [];
  try {
    const wordApi = await takeWordFromApi(wordArry);
    if (wordApi == false) {
      wordBase.forEach( el=> wordArry.push(el))
    }
  } finally {
    hiddenWord.splice(0, hiddenWord.length)
    let random = Math.floor(Math.random() * wordArry.length);

    wordArry[random].forEach((el, i) => {
      hiddenWord.push(el);
    })

    currentWord.splice(0, currentWord.length)
    vievText.textContent = '';

    for (el of hiddenWord) {
      currentWord.push('_');
      vievText.textContent += ` ${currentWord[el.indexOf(el)]} `;
    }
  }
};
const startTheGame = function () {
  let mistake = 0;
  letterButtons.forEach((el) => {
    el.addEventListener('click', function () {
      el.classList.add('hidden');
      if (hiddenWord.indexOf(el.value) > -1) {
        let indexOfLetters = hiddenWord.reduce((acc, hel, i) => {
          if (hel === el.value) {
            acc.push(i);
          }
          return acc;
        }, [])
        indexOfLetters.forEach(el => currentWord[el] = hiddenWord[el]);
        vievText.textContent = currentWord.join(' ');
        if (currentWord.join('') === hiddenWord.join('')) {
          mistake = 0;
          gameText.textContent = 'You Won';
          gameText.style.color = '#E2D58B';
          whenGamesEnds();
        }
      }
      if (hiddenWord.indexOf(el.value) === -1) {
        mistake++
        imgPanel[mistake].classList.remove('hidden');
        if (mistake == 8) {
          mistake = 0;
          vievText.textContent = hiddenWord.join(' ')
          gameText.textContent = `You Lose`;
          gameText.style.color = '#190933';
          whenGamesEnds();
        }
      }
    });
  });
};
const whenGamesEnds = function () {
  letterButtons.forEach((el) => {
    el.classList.add('hidden');
  });
  gameText.classList.remove('hidden');
  setTimeout(() => {
    changeGameSection()
    changeEndMenu(true);
    gameText.classList.add('hidden');
  }, 5000)
};

//Button's functions
const whenMenuBtnClicked = function () {
  changeHeaderSection('0')
  changeMenuSection();
  changeGameSection(true);
  wordToHtml();
};
const whenResetBtnClicked = function () {
  changeEndMenu(false);
  changeGameSection(true);
  wordToHtml();
};
const whenGoBackBtnClicked = function () {
  changeEndMenu();
  changeHeaderSection('30%')
  changeMenuSection();
  changeGameSection();
};
startTheGame();
//Button's with events and  functions
menuBtn.addEventListener('click', () => {
  whenMenuBtnClicked();
}, false)
restetBtn.addEventListener('click', () => {
  whenResetBtnClicked();
}, false)
goBackBtn.addEventListener('click', () => {
  whenGoBackBtnClicked();
}, false)

