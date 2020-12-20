'use strict';

const cards = document.querySelectorAll('.cards');
const cardsRow = document.querySelector('.cards__row');
const select = document.querySelector('.form__select');
const startBtn = document.getElementById('start');

const createCards = counter =>{

    cards.forEach((cardsBlock, i) =>{
        let cardsRow = document.createElement('div');
        let cardsItemNumber = document.createElement('span');
        let cardsItemFirst = document.createElement('span');
        let cardsItemSecond = document.createElement('span');
        let cardsItemThird = document.createElement('span');

        cardsRow.className = 'cards__row';
        cardsItemNumber.className = 'cards__item-counter';
        cardsItemFirst.className = 'cards__item cards__item--first';
        cardsItemSecond.className = 'cards__item cards__item--second';
        cardsItemThird.className = 'cards__item cards__item--third';

        cardsItemNumber.innerHTML = counter;

        cardsBlock.append(cardsRow);
        cardsRow.append(cardsItemNumber);
        cardsRow.append(cardsItemFirst);
        cardsRow.append(cardsItemSecond);
        cardsRow.append(cardsItemThird);
    });
};

const start = () => {
    startBtn.addEventListener('click', e => {
        e.preventDefault();
        let numberOfExp = Number(select.value);
        if(isNaN(numberOfExp) == false){
            for(let i = 1; i <= numberOfExp; i++){
                createCards(i);
            }
        }
        else console.log('Выберите количество экспериментов');


    });
};

start();