"use strict";

const checkbox = document.getElementById("isAuto");
const cardsBlock = document.querySelectorAll(".cards");
let data = [];
let results = [];

let numberOfExp;

const createCards = (counter) => {
  cardsBlock.forEach((item) => {
    let cardsRow = document.createElement("div");
    let cardsItemCounter = document.createElement("span");
    for (let i = 1; i <= 3; i++) {
      window["cardsItem" + i] = document.createElement("span");
      window["cardsItem" + i].className = "cards__item";
      window["cardsItemText" + i] = document.createElement("p");
      window["cardsItemText" + i].className = "cards__item-text";
    }

    cardsRow.className = "cards__row";
    cardsItemCounter.className = "cards__item-counter";
    cardsItemCounter.innerHTML = counter;

    item.append(cardsRow);
    cardsRow.append(cardsItemCounter);
    cardsRow.append(cardsItem1);
    cardsRow.append(cardsItem2);
    cardsRow.append(cardsItem3);

    cardsItem1.append(cardsItemText1);
    cardsItem2.append(cardsItemText2);
    cardsItem3.append(cardsItemText3);
  });
};

const random = (arr) => {
  let rand = Math.floor(Math.random() * 3) + 0;
  return arr[rand];
};

const selectCards = () => {};

const autoSelectCards = () => {
        checkbox.disabled = "disabled";

        const cardsRow = document.querySelectorAll('.cards__row');
      
        cardsRow.forEach(item => {
          let cards = [];
          for (let i = 0; i < item.childNodes.length; i++) {
            if (item.childNodes[i].classList.contains('cards__item')) {
              cards.push(item.childNodes[i]);
            }
          }
          random(cards).classList.add('selected');
        //   console.log(cards);
        });

        // for obj
        for(let i=0; i<data.length; i++){
            let rand = Math.floor(Math.random() * 3) + 0;
            data[i][rand].select = 'selected';
        }
        // console.log(data);

        findWin();
};

const findWin = () => {
    const cardsRow = document.querySelectorAll('.cards__row');
    cardsRow.forEach(item => {
        let cards = [];
        for(let i=0; i< item.childNodes.length; i++){
            if(item.childNodes[i].classList.contains('cards__item')){
                cards.push(item.childNodes[i]);
            }
        }
        random(cards).classList.add('win');
    });

    // for obj
    for(let i=0; i<data.length; i++){
        let rand = Math.floor(Math.random() * 3) + 0;
        data[i][rand].win = 'win';
    }
    
    // console.log(data);

    showWinner();

};

const showWinner = () => {
    const cardsRow = document.querySelectorAll('.cards--stick .cards__row');
    const cardsRowChange = document.querySelectorAll('.cards--change .cards__row');
    const completeBtn = document.getElementById('complete');

    completeBtn.addEventListener('click', e => {
        e.preventDefault();
        cardsRow.forEach(item => {
            for(let i =0; i < item.childNodes.length; i++){
                if(item.childNodes[i].classList.contains('win')){
                    item.childNodes[i].style.background = 'red';
                }
                if(item.childNodes[i].classList.contains('win') && 
                item.childNodes[i].classList.contains('selected')){
                    item.childNodes[i].style.background = 'green';
                }
            }
        });

        // empty cards
        cardsRowChange.forEach(item => {
            for(let i = 0; i < item.childNodes.length; i++){
                if(item.childNodes[i].classList.contains('cards__item') && 
                !item.childNodes[i].classList.contains('win') &&
                !item.childNodes[i].classList.contains('selected')){
                    item.childNodes[i].children[0].innerHTML = 'ПУСТО';
                    item.childNodes[i].classList.add('empty');
                    break;
                }
            }
        });

        // changed cards
        cardsRowChange.forEach(item => {
            for(let i = 0; i < item.childNodes.length; i++){
                if(!item.childNodes[i].classList.contains('empty') && 
                !item.childNodes[i].classList.contains('selected')){
                    item.childNodes[i].classList.add('changed');
                }
            }
        });

        // check winner
        cardsRowChange.forEach(item => {
            for(let i = 0; i < item.childNodes.length; i++){
                if(item.childNodes[i].classList.contains('selected')){
                    item.childNodes[i].classList.remove('selected');
                }
                if(item.childNodes[i].classList.contains('win')){
                    item.childNodes[i].style.background = 'red';
                }
                if(item.childNodes[i].classList.contains('win') &&
                item.childNodes[i].classList.contains('changed')){
                    item.childNodes[i].style.background = 'green';
                }
            }
        });

        // for obj
        console.log(data);
        setTimeout(showResults, 1000);
    });
}

const createResultsCard = (counter) =>{
    const resultsContainer = document.querySelectorAll('.results__container');

    resultsContainer.forEach(item => {
        let resCard = document.createElement('div');
        let resCardText = document.createElement('span');

        resCard.className = 'result__card';
        resCardText.className = 'result__card-text';

        item.append(resCard);
        resCard.append(resCardText);

        resCardText.innerHTML = counter;
    })

}

const showResults = () => {
    const resultStick = document.querySelector('.results__item--stick .results__container');
    const resultChange = document.querySelector('.results__item--change .results__container');
    const cardsRow = document.querySelectorAll('.cards--stick .cards__row');
    const cardsRowChange = document.querySelectorAll('.cards--change .cards__row');

    let arrResultStick = [];
    let arrResultChange = [];
    for(let i=0; i< cardsRow.length; i++){
        for(let j=0; j< cardsRow[i].childNodes.length; j++){
            if(cardsRow[i].childNodes[j].classList.contains('win') &&
            cardsRow[i].childNodes[j].classList.contains('selected')){
                // console.log(resultStick.children[i]);
                resultStick.children[i].classList.add('win');
                arrResultStick.push(1);
            }
        }
        // console.log(cardsRow[i]);
    }

    // for changed
    for(let i=0; i<cardsRowChange.length; i++){
        for(let j=0; j<cardsRowChange[i].childNodes.length; j++){
            if(cardsRowChange[i].children[j].classList.contains('win') &&
            cardsRowChange[i].children[j].classList.contains('changed')){
                // console.log(cardsRowChange[i].children[j]);
                resultChange.children[i].classList.add('win');
                arrResultChange.push(1);

            }
        }
        // console.log(resultChange.children[i]);
    }

    // result stat
    const resultStatStick = document.querySelector('.results__item--stick .results__stat');
    const resultStatChange = document.querySelector('.results__item--change .results__stat');

    resultStatStick.innerHTML = `Статистика: ${arrResultStick.length}/${cardsRow.length}`;
    resultStatChange.innerHTML = `Статистика: ${arrResultChange.length}/${cardsRowChange.length}`;


}

const start = () => {
  const select = document.querySelector(".form__select");
  const startBtn = document.getElementById("start");

  startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    startBtn.disabled = "disabled";
    checkbox.disabled = "disabled";

    numberOfExp = Number(select.value);
    if (isNaN(numberOfExp) == false) {
      for (let i = 0; i < numberOfExp; i++) {
        data.push({ className: "cards__row" });
        for (let j = 0; j < 3; j++) {
          data[i][j] = {
            className: "cards__item",
          };
          data[i][j]["text"] = {
            className: "cards__item-text",
          };
        }
      }
      if (numberOfExp <= 100) {
        for (let i = 1; i <= numberOfExp; i++) {
          createCards(i);
          createResultsCard(i);
        }
        if (checkbox.checked) {
            autoSelectCards();
        }
        else{
            selectCards();
        }
      }
      else{
          autoSelectCards();
      }
    // show();
    // autoSelectCards();
    } else console.log("Выберите количество экспериментов");
  });
};

start();
