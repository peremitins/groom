const swiper = new Swiper('.swiper-container', {
  loop: true,
  // autoplay: true,
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  // lazy: true,
  // lazy: {
  //   loadPrevNext: true,
  // },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  grabCursor: true,
  breakpoints: {
    280: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 3,
    }
  }
});

/* menu start */

let burger = document.querySelector('.burger');
let menuList = document.querySelector('.header__menu-list');
let headerFootprint = document.querySelector('.header__footprint');
let headerMenuLink = document.querySelectorAll('.header__menu-link');
let body = document.body;

burger.addEventListener('click', function (e) {
  e.stopPropagation();
  burger.classList.toggle('active');
  menuList.classList.toggle('active');
  body.classList.toggle('active');
  if (burger.classList.contains('active')) {
    headerFootprint.style.display = 'block';
  } else {
    headerFootprint.style.display = 'none';
  }
});

let header = document.querySelector('.header');
if (pageYOffset > 10) {
  header.classList.add('scroll');
}
window.addEventListener('scroll', function (e) {
  if (pageYOffset > 10) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }
});

headerMenuLink.forEach(link => {
  link.addEventListener('click', function () {
    link.classList.add('active-link');
    burger.classList.remove('active');
    menuList.classList.remove('active');
    body.classList.remove('active');
    headerFootprint.style.display = 'none';
  })
});

let sections = document.querySelectorAll('section[id]');

function scrollActive() {
  let scrollY = window.pageYOffset;
  sections.forEach(function (current) {
    let sectionHeight = current.offsetHeight;
    let sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('a[href*=' + sectionId + ']').classList.add('active-link');
    } else {
      document.querySelector('a[href*=' + sectionId + ']').classList.remove('active-link');
    }
  });
};
window.addEventListener('scroll', scrollActive);


/* menu end */

/* mask tel start */
let selector = document.querySelectorAll('input[type="tel"]');

let im = new Inputmask({
  mask: "+7 (999) 999-99-99",
  showMaskOnHover: false,
  showMaskOnFocus: true
});
im.mask(selector);

/* mask tel end */

/* scrollTop start */

let scrollTop = document.getElementById('scroll-top');

if (pageYOffset > 550) {
  scrollTop.classList.add('show-scroll');
}

window.addEventListener('scroll', function (e) {
  if (pageYOffset > 550) {
    scrollTop.classList.add('show-scroll');
  } else {
    scrollTop.classList.remove('show-scroll');
  }
});

scrollTop.addEventListener('click', function (e) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
})

/* scrollTop end */

/* scrollReveal start */

let sr = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 600,
  easing: 'cubic-bezier(.175,.885,.32,1.275)',
  // scale: 1.4,
});
sr.reveal(".head__text, .head__img, .services__title, .services__item, .about__title, .about__item, .slider, .form-row", {
  interval: 150
});

/* scrollReveal end */

/* lazy load start */
const images = document.querySelectorAll('img');

const options = {
	root: null,
	rootMargin: '0px',
	threashold: 0.1
}

function handleImg(myImg, observer) {
	myImg.forEach(myImgSingle => {
		if (myImgSingle.intersectionRatio > 0) {
			loadImage(myImgSingle.target);
		}
	})
}

function loadImage(image) {
	image.src = image.getAttribute('data-src');
}

const observer = new IntersectionObserver(handleImg, options);

images.forEach(img => {
	observer.observe(img);
});

/* lazy load end */