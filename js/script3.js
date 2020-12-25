"use strict";

const checkbox = document.getElementById("isAuto");
const cardsBlock = document.querySelectorAll(".cards");
let data = [];
let results = [];

let numberOfExp;

const createCards = (counter) => {
  cardsBlock.forEach((item) => {
    let cardsRow = document.createElement("div");
    // let cardsItemCounter = document.createElement("span");
    for (let i = 1; i <= 3; i++) {
      window["cardsItem" + i] = document.createElement("span");
      window["cardsItem" + i].className = "cards__item";
      window["cardsItemText" + i] = document.createElement("p");
      window["cardsItemText" + i].className = "cards__item-text";
    }

    cardsRow.className = "cards__row";
    cardsRow.innerHTML = counter;
    // cardsItemCounter.className = "cards__item-counter";
    // cardsItemCounter.innerHTML = counter;

    item.append(cardsRow);
    // cardsRow.append(cardsItemCounter);
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
        // 
        const cards = document.querySelectorAll('.cards');
        // const cardsItem = document.querySelectorAll('.cards__item');

        // for obj
        for(let i=0; i<data.length; i++){
            // console.log(Object.keys(data[i]));
            for(let j=0; j< Object.keys(data[i]).length-1; j++){
                let rand = Math.floor(Math.random() * 3) + 0;
                data[i][j][rand].select = 'selected';
                // console.log(data[i][j]);
            }
        }

        // for visual
        
        for(let i=0; i<cards.length; i++){
            for(let j=0; j<cards[i].children.length; j++){
                for(let k=0; k< cards[i].children[j].children.length; k++){
                    if(data[i][j][k].select == 'selected'){
                        cards[i].children[j].children[k].classList.add('selected');
                    }
                }
            }
        }

        // console.log(data);
        findWin();
};

const findWin = () => {
    const cards = document.querySelectorAll('.cards');

    // for obj
    for(let i=0; i<data.length; i++){
        for(let j=0; j< Object.keys(data[i]).length-1; j++){
            let rand = Math.floor(Math.random() * 3) + 0;
            data[i][j][rand].prize = true;
        }
    }

    // for visual
    for(let i=0; i<cards.length; i++){
        for(let j=0; j<cards[i].children.length; j++){
            for(let k=0; k< cards[i].children[j].children.length; k++){
                if(data[i][j][k].hasOwnProperty('prize')){
                    cards[i].children[j].children[k].classList.add('prize');
                }
            }
        }
    }
    showWinner();
};

const showWinner = () => {
    const cardsRow = document.querySelectorAll('.cards--stick .cards__row');
    const cardsRowChange = document.querySelectorAll('.cards--change .cards__row');
    const completeBtn = document.getElementById('complete');

    completeBtn.addEventListener('click', e => {
        e.preventDefault();
        // for obj
        for(let i=0; i<data.length; i++){
            for(let j=0; j< Object.keys(data[i]).length-1; j++){
                for(let k =0; k< Object.keys(data[i][j]).length-1; k++){
                    if(!data[i][j][k].hasOwnProperty('prize') &&
                    !data[i][j][k].hasOwnProperty('select')){
                        data[i][j][k].empty = true;
                        break;
                    }
                }
            }
        }
        for(let i=0; i<data.length; i++){
            for(let j=0; j< Object.keys(data[i]).length-1; j++){
                for(let k =0; k< Object.keys(data[i][j]).length-1; k++){
                    if(data[i].className == 'cards--stick'){
                        if(data[i][j][k].hasOwnProperty('select') && 
                        data[i][j][k].hasOwnProperty('prize')){
                            data[i][j][k].win = true;
                        }
                    }
                    if(data[i].className == 'cards--change'){
                        if(!data[i][j][k].hasOwnProperty('select') &&
                        !data[i][j][k].hasOwnProperty('empty')){
                            data[i][j][k].change = 'changed';
                        }
                        if(data[i][j][k].hasOwnProperty('change') &&
                        data[i][j][k].hasOwnProperty('prize')){
                            data[i][j][k].win = true;
                        }
                    }
                    
                }
            }
        }

        // for visual
        for(let i=0; i<cardsBlock.length; i++){
            for(let j=0; j< cardsBlock[i].children.length; j++){
                for(let k=0; k< cardsBlock[i].children[j].children.length; k++){
                    if(cardsBlock[i].classList.contains('cards--stick')){
                        if(data[i][j][k].hasOwnProperty('prize')){
                            cardsBlock[i].children[j].children[k].style.background = 'red';
                        }
                        if(data[i][j][k].hasOwnProperty('win')){
                            cardsBlock[i].children[j].children[k].classList.add('win');
                            cardsBlock[i].children[j].children[k].style.background = 'green';
                            
                        }

                    }
                    if(cardsBlock[i].classList.contains('cards--change')){
                        if(data[i][j][k].hasOwnProperty('prize')){
                            cardsBlock[i].children[j].children[k].style.background = 'red';
                        }
                        if(data[i][j][k].hasOwnProperty('empty')){
                            cardsBlock[i].children[j].children[k].children[0].innerHTML = 'ПУСТО';
                        }
                        if(data[i][j][k].hasOwnProperty('change')){
                            cardsBlock[i].children[j].children[k].style.background = 'yellow';
                        }
                        if(data[i][j][k].hasOwnProperty('change') &&
                        data[i][j][k].hasOwnProperty('prize')){
                            cardsBlock[i].children[j].children[k].classlist = 'win';
                            cardsBlock[i].children[j].children[k].style.background = 'green';
                        }
                    }

                }
                
            }
        }
        showResults();
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
    const cardsRow = document.querySelectorAll('.cards--stick .cards__row');
    const cardsRowChange = document.querySelectorAll('.cards--change .cards__row');

    const resultsContainer = document.querySelectorAll('.results__container');

    let arrResultStick = [];
    let arrResultChange = [];
 
    // for obj
    for(let i=0; i<data.length; i++){
        for(let j=0; j< Object.keys(data[i]).length-1; j++){
            for(let k=0; k< Object.keys(data[i][j]).length-1; k++){
                if(data[i].className == 'cards--stick'){
                    if(data[i][j][k].hasOwnProperty('win')){
                        resultsContainer[i].children[j].classList.add('win');
                        arrResultStick.push(1);
                    }
                }
                if(data[i].className == 'cards--change'){
                    if(data[i][j][k].hasOwnProperty('win')){
                        resultsContainer[i].children[j].classList.add('win');
                        arrResultChange.push(1);
                    }
                }
            }
        }
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
  const cardBlocks = document.querySelectorAll('.cards');

  startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    startBtn.disabled = "disabled";
    checkbox.disabled = "disabled";

    numberOfExp = Number(select.value);
    if (isNaN(numberOfExp) == false) {
        cardsBlock.forEach((block, counter) => {
            if(counter == 0){
                data[counter] = { className: "cards--stick"}
            }
            else data[counter] = { className: "cards--change"}

            for (let i = 0; i < numberOfExp; i++) {
                data[counter][i] = { className: "cards__row" };
                for (let j = 0; j < 3; j++) {
                    data[counter][i][j] = {
                        className: "cards__item",
                    };
                    data[counter][i][j]["text"] = {
                        className: "cards__item-text",
                    };
                }
            }
        })

        if (numberOfExp <= 15) {
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
            if(numberOfExp <=100){
                for (let i = 1; i <= numberOfExp; i++) {
                    createResultsCard(i);
                }
                autoSelectCards();
            }
        }
    // show();
    // autoSelectCards();
    } else console.log("Выберите количество экспериментов");
  });
};

start();
