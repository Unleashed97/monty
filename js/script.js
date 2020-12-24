'use strict';

const cards = document.querySelectorAll('.cards');
const cardsRow = document.querySelector('.cards__row');
const select = document.querySelector('.form__select');
const startBtn = document.getElementById('start');

const createCards = counter =>{

    cards.forEach(cardsBlock =>{
        let cardsRow = document.createElement('div');
        let cardsItemNumber = document.createElement('span');
        let cardsItemFirst = document.createElement('span');
        let cardsItemSecond = document.createElement('span');
        let cardsItemThird = document.createElement('span');
        let cardsItemText1 = document.createElement('p');
        let cardsItemText2 = document.createElement('p');
        let cardsItemText3 = document.createElement('p');

        cardsRow.className = 'cards__row';
        cardsItemNumber.className = 'cards__item-counter';
        cardsItemFirst.className = 'cards__item cards__item--first';
        cardsItemSecond.className = 'cards__item cards__item--second';
        cardsItemThird.className = 'cards__item cards__item--third';
        cardsItemText1.className = 'cards__item-text';
        cardsItemText2.className = 'cards__item-text';
        cardsItemText3.className = 'cards__item-text';

        random(cardsItemFirst, cardsItemSecond, cardsItemThird).classList.add('win');

        cardsItemNumber.innerHTML = counter;

        cardsItemFirst.append(cardsItemText1);
        cardsItemSecond.append(cardsItemText2);
        cardsItemThird.append(cardsItemText3);

        cardsBlock.append(cardsRow);
        cardsRow.append(cardsItemNumber);
        cardsRow.append(cardsItemFirst);
        cardsRow.append(cardsItemSecond);
        cardsRow.append(cardsItemThird);
    });
};

const random = function(card1, card2, card3) {
    let rand =  Math.floor(Math.random() * 3) + 0;
    return arguments[rand];
}

const chooseCard = () =>{
    const cardsItem = document.querySelectorAll('.cards__item');

    cardsItem.forEach(item => {
        item.addEventListener('click', () =>{
            let parent = item.parentNode;

            parent.childNodes.forEach(i =>{
                if(i.classList.contains('chosen')){
                    i.classList.remove('chosen');
                }
            });
            item.classList.add('chosen');
            
        });
    });
}

const changeCard = () =>{
    const cardsRowsChange = document.querySelectorAll('.cards--change .cards__row');
    // const cardsItemChange = cardsRowsChange.querySelectorAll('.cards__item');

    for(let i=0; i<cardsRowsChange.length; i++){
        for(let j=0; j<cardsRowsChange[i].childNodes.length; j++){
            if(cardsRowsChange[i].childNodes[j].classList.contains('cards__item') && !cardsRowsChange[i].childNodes[j].classList.contains('win') &&
            !cardsRowsChange[i].childNodes[j].classList.contains('chosen')){
                // cardsRowsChange[i].childNodes[j].innerHTML = 'ПУСТО';
                cardsRowsChange[i].childNodes[j].classList.add('empty');
                cardsRowsChange[i].childNodes[j].children[0].innerHTML = "ПУСТО";
                break;
            }
       }
    }

    for(let i=0; i<cardsRowsChange.length; i++){
        for(let j=0; j<cardsRowsChange[i].childNodes.length; j++){
            if(!cardsRowsChange[i].childNodes[j].classList.contains('empty') && !cardsRowsChange[i].childNodes[j].classList.contains('chosen')){
                cardsRowsChange[i].childNodes[j].classList.add('changed');
            }
        }
    }

    for(let i=0; i<cardsRowsChange.length; i++){
        for(let j=0; j<cardsRowsChange[i].childNodes.length; j++){
            if(cardsRowsChange[i].childNodes[j].classList.contains('chosen')){
                cardsRowsChange[i].childNodes[j].classList.remove('chosen');
            }
        }
    }
}

const showCards = () =>{
    const completeBtn = document.getElementById('complete');
    const cardsItem = document.querySelectorAll('.cards__item');

    completeBtn.addEventListener('click', e => {
        e.preventDefault();
        cardsItem.forEach(item => {

            if(item.classList.contains('win')){
                item.style.background = 'red';
            }
            if(item.classList.contains('win') && item.classList.contains('chosen')){
                // item.style.background = 'linear-gradient(#0000ff, #ff0000)';
                item.style.background = 'green';
            }
        });
        changeCard();
    });

    
}


const start = () => {
    startBtn.addEventListener('click', e => {
        e.preventDefault();
        startBtn.disabled = true;
        let numberOfExp = Number(select.value);
        if(isNaN(numberOfExp) == false){
            for(let i = 1; i <= numberOfExp; i++){
                createCards(i);
            }
        }
        else console.log('Выберите количество экспериментов');

        chooseCard();
        showCards();
    });
};

let init = () =>{
    start();
}

init();