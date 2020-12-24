'use strict';
const scroll = () =>{
    const scroll = document.querySelector('.scroll');
    scroll.addEventListener('click', () => {
        scroll.children[0].style.color = '#696969';
        // scroll.children[0].classList.add('to-top');
        window.scrollTo(0, document.body.scrollHeight, {
            behavior: 'smooth'
        });


    });
};
scroll();