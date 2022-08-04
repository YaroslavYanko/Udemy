"use strict";

const nav = document.querySelector(".nav");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn, i) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
////////////////////////////////////////////////////////////////////////////

///Кнопка прокрутки (Learn more ↓)
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

//Навігація меню
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    //href="#section--1"
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///3 кнопки з переключателями на 3 блоки
tabsContainer.addEventListener("click", (e) => {
  //clicked приймає кнопку по якій пройшов клік з класом ".operations__tab"
  //closest = перехоплює Bubbling
  const clicked = e.target.closest(".operations__tab");

  //!clicked якщо ми нажали на сам контейнер з кнопками то вернеться = null
  if (!clicked) return;
  //Видаляєм активний клас на всіх кнопках і контенті
  tabs.forEach((el, i) => {
    el.classList.remove("operations__tab--active");
    tabsContent[i].classList.remove("operations__content--active");
  });
  //Добавляєм активний клас відповідній кнопці і контенті
  //clicked.dataset.tab приймає активну data від кнопки (data-tab="1")
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Анімація меню
const handleHover = function (e) {
  //якщо при наведенні в блоку є клас nav__link
  if (e.target.classList.contains("nav__link")) {
    // link = <a class="nav__link"></a>
    const link = e.target;

    // піднямаєм пошук від link до контейнера в якого берем масив лінків (NodeList(4))
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    // logo получає доступ до img який є в контейнері .nav
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        //Всі ліки крім того на який ми навели
        //this = приймає параметри від bind (0.5),(1)
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
// nav = контейнер  з меню
// в bind можна передати декілька пераметрвів в виді масиву
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

/////// Фіксація меню після прокрутки ///////////////////////////////////////////////////////
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect();

const stickyNav = function (entries) {
  //Деструкторизація з 1 масивом
  const [entry] = entries;

  if (!entry.isIntersecting) {
    //isIntersecting = false
    //header зникає з зони видимості
    //intersectionRatio = 0
    nav.classList.add("sticky");
  } else {
    //isIntersecting = true
    //header Попадає в зону видимості
    //intersectionRatio = 1
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //threshold: 0 коли header повнюстю зникає з поля зору
  rootMargin: `-${navHeight.height}px`,
  //navHeight.height динамічно вираховуєм висоту блоку в залежності від розміру екрану
  //rootMargin на -90px швидша поява блоу до початку наступного блоку
});
//від якого блоку буде іти запит = header
headerObserver.observe(header);

//Поява блоків при прокрутці ////////////////////////////////////////////////////
const allSection = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

//  entries.forEach(m=>{
//    if(entry.isIntersecting){
//     entry.target.classList.remove("section--hidden");
//    }
//  })
// console.log(entry)
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  //Зупиняєм спостереження за секцією після появи
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.5,
});

allSection.forEach((section) => {
  //section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

////////////Поява картинок при прокрутці для оптимізації загрузки сторінки
const imgTargets = document.querySelectorAll("img[data-src]");

const showImg = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.setAttribute("src", entry.target.dataset.src);

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observe.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(showImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

///////////////////////////Slider

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };


  const activateDot = function (curSlide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${curSlide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (curSlide) {
    slides.forEach((slide, i) => {
      // Step 1.(0-1)=-1 , 100*-1=-100 Step 2.(0-2)=-2 , 100*-2=-200
      //2-2=0,
      //3-3=0
      slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
  };


  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

 const init= function(){
  //Початкові параметри
  createDots();
  goToSlide(0);
  activateDot(curSlide);
 }
 init()

  btnLeft.addEventListener("click", prevSlide);
  btnRight.addEventListener("click", nextSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      goToSlide(e.target.dataset.slide);
      activateDot(e.target.dataset.slide);
      curSlide = Number(e.target.dataset.slide);
    }
  });
};
slider()

//////////////////////////////////
