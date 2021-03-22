'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>btn.addEventListener('click',openModal))

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header')
// creating and inserting elements
const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML = 'We use cookies to improve analytics <button class="btn btn--close-cookie">Got it</button>';
// header.prepend(message)
header.append(message);
// header.append(message.cloneNode(true))

// header.before(message)
// header.after(message)

// deleting
document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  message.remove();
})

// styles

message.style.background='#37383d';
message.style.width='120%';

message.style.height = Number.parseFloat(getComputedStyle(message).height,10)+30+'px';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function(){
  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords);
  // window.scrollTo(s1cords.left+window.pageXOffset,s1cords.top+window.pageYOffset)
  window.scrollTo({ left:s1cords.left+window.pageXOffset, top:s1cords.top+window.pageYOffset, behavior:'smooth'})

})