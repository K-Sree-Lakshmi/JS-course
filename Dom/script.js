'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

//  Menu fade navigation
const nav = document.querySelector('.nav')
///////////////////////////////////////
// Modal window


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

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
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove();
})

// styles

message.style.background = '#37383d';
message.style.width = '120%';

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';



btnScrollTo.addEventListener('click', function () {
  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords);
  // window.scrollTo(s1cords.left+window.pageXOffset,s1cords.top+window.pageYOffset)
  window.scrollTo({ left: s1cords.left + window.pageXOffset, top: s1cords.top + window.pageYOffset, behavior: 'smooth' })

})

// page navigation

// Rather than simply attaching the same event handler to multiple elements we do event delation as shown below
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//   const id = this.getAttribute('href')
//   console.log(id)
//   document.querySelector(id).scrollIntoView({behavior:'smooth'})

// })
// })

// event delegation
// 1.Add event listener to a common parent that we are interested in
// 2. Determine what element originated the event
document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    console.log(id)
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

// Tabbed components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked)
  if (!clicked) return;
  // remove activation
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(t => t.classList.remove('operations__content--active'))
  // activate tabs
  clicked.classList.add('operations__tab--active')

  // activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

const handleHover = function (e) {

  console.log(this)
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}
// passing an "argument" into handler function
nav.addEventListener('mouseover',
  handleHover.bind(0.5)
)

nav.addEventListener('mouseout',
  handleHover.bind(1)
)

// Sticky navigation

const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords)
window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky')
  else nav.classList.remove('sticky')

})


// const randomInt = (min,max) => Math.floor(Math.random()*(max-min+1)+min);

// const randomColor = () => `rgb(${randomInt(0,225)},${randomInt(0,225)},${randomInt(0,225)})`;

// console.log(randomColor(0,225))

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor()
//   console.log('LINK',e.target,e.currentTarget)
//   // stop propagation
//   // e.stopPropagation()
// })

// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor()
//   console.log('CONTAINER',e.target,e.currentTarget)

// })

// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor()
//   console.log('NAV',e.target,e.currentTarget)

// },false)

// const obsCallBack = function(entries,observer) {
//   entries.forEach(entry=>{
//     console.log(entry)
//   })
// }
// const obsOptions = {
// focuses on entire view port
//   root: null,
//   // 10%, percentage that we want to have visible in our root.
//   threshold: [0,0.2]
// }
// const observer = IntersectionObserver(obsCallBack, obsOptions)
// observer.observe(section1)

const headera = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  // destructure syntax
  const [entry] = entries;
  console.log(entry)

  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(headera)

const sectionAll = document.querySelectorAll('.section')
const revealSection = function (entries, observer) {
  const [entry] = entries
  console.log(entry)
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})
sectionAll.forEach(function (section) {
  sectionObserver.observe(section)
  // section.classList.add('section--hidden')
})

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function (entries, observer) {
  const [entry] = entries
  console.log(entry)
  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img))


const slides = document.querySelectorAll('.slide')
// const slider = document.querySelector('.slider')
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;
const maxSlides = slides.length;
// slider.style.transform = 'scale(0.5) translateX(-800px)'
// slider.style.transform = 'visible'

// As it starts with 0%, 100%, 200% and 300%
// slides.forEach((s, i) => s.style.transform = `translate(${100 * i}%)`)

const goToSlide = function (slide) {
  slides.forEach((s, i) => s.style.transform = `translate(${100 * (i - slide)}%)`)
}
goToSlide(0);

const nextSlide = function () {
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  }
  else {
    currentSlide++;
  }
  goToSlide(currentSlide)
}

const prevSlide = function () {
  if(currentSlide===0){
    currentSlide=maxSlides-1
  }
  else {
    currentSlide--;
  }
  goToSlide(currentSlide)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

  // initially i =0 0-1 = -1
  // As we want it to be -100%, 0%, 100% and 200%
