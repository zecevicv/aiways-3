/* #Header
    ======================================================= */
const header = document.querySelector('.header');
const headerMenu = document.querySelector('.header-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0 && !header.classList.contains('inverted')) {
    header.classList.add('header-white');
  } else {
    header.classList.remove('header-white');
  }
});

if (window.scrollY > 0) {
  header.classList.add('header-white');
} else {
  header.classList.remove('header-white');
}

// Disable seeing while page load
if (headerMenu) {
  headerMenu.style.display = 'none';

  setTimeout(function(){ 
    headerMenu.style.display = '';
  }, 600);
}

// Menu
const hamburger = document.querySelector('.header-hamburger a');

if (hamburger) {
  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    header.classList.toggle('show');
  });
}

/* #Video Section 1
================================================== */
const videoSection1 = document.querySelector('.video-section-1');
const btnRight = document.querySelector('.video-section-1 .btn-right');

if (videoSection1 && window.innerWidth > 1024) {
  btnRight.addEventListener('mouseenter', (e) => {
    videoSection1.classList.add('inverted');
    header.classList.add('inverted');
  });

  btnRight.addEventListener('mouseleave', (e) => {
    videoSection1.classList.remove('inverted');
    header.classList.remove('inverted');
  });
}

/* #Video Section 2
================================================== */
let cardList = document.querySelectorAll('.video-section-2 .cards li');
let videoList = document.querySelectorAll('.video-section-2 .bg li');

if (cardList[0] && videoList[0]) {
  // Play First Video
  videoList[0].querySelector('video').play();

  cardList.forEach((card, cardIndex) => {
    if (window.innerWidth > 1024) {
      card.addEventListener('mouseenter', (e) => {
        cardList.forEach((card2) => {
          card2.classList.remove('active');
        });
        videoList.forEach((videoItem, videoIndex) => {
          let video = videoItem.querySelector('video');

          if (cardIndex === videoIndex) {
            videoItem.classList.add('active');
            video.play();
          } else {
            videoItem.classList.remove('active');
            video.currentTime = 0;
            video.pause();
          }
        });

        card.classList.add('active');
      });
    } else {
      card.addEventListener('click', (e) => {
        cardList.forEach((card2) => {
          card2.classList.remove('active');
        });
        videoList.forEach((videoItem, videoIndex) => {
          let video = videoItem.querySelector('video');

          if (cardIndex === videoIndex) {
            videoItem.classList.add('active');
            video.play();
          } else {
            videoItem.classList.remove('active');
            video.currentTime = 0;
            video.pause();
          }
        });

        card.classList.add('active');
      });
    }
  });

  if (window.innerWidth > 1024) {
    gsap.to(".video-section-2 .car", {
      xPercent: -80,
      ease: "none",
      scrollTrigger: {
        trigger: ".video-section-2 .car",
        scrub: true
      },
    });
  }
}

/* #Video Section 3
================================================== */
if (
  document.querySelector('.video-section-3 .thumbs-slider .swiper-container') &&
  document.querySelector('.video-section-3 .gallery-slider .swiper-container')
) {
  // Slider Initialization
  let thumbsSlider = new Swiper(".video-section-3 .thumbs-slider .swiper-container", {
    slidesPerView: 5,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".video-section-3 .thumbs-slider .swiper-button-next",
      prevEl: ".video-section-3 .thumbs-slider .swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.5,
        centeredSlides: true,
      },
      1024: {
        slidesPerView: 5,
        centeredSlides: false,
      }
    },
    loop: true
  });

  let gallerySlider = new Swiper(".video-section-3 .gallery-slider .swiper-container", {
    slidesPerView: 1,
    effect: 'fade',
    allowTouchMove: false,
  });

  let thumbSlides = thumbsSlider.slides;
  let gallerySlides = gallerySlider.slides;

  // Play First Video
  gallerySlides[0].querySelector('video').play();

  // Play different video on hover (desktop)
  if (window.innerWidth > 1024) {
    thumbSlides.forEach((slide, index) => {
      slide.addEventListener('mouseenter', (e) => {
        let slideTo = slide.dataset.slideTo;
        if (gallerySlider.activeIndex != slideTo) {
          let galleryVideos = document.querySelectorAll('.video-section-3 .gallery-slider video');
          let galleryVideo = gallerySlides[slideTo].querySelector('video');
  
          galleryVideos.forEach((video) => {
            video.pause();
            galleryVideo.currentTime = 0;
          });
  
          galleryVideo.play();
  
          gallerySlider.slideTo(slideTo);
        }
      });
    });
  }

  // Play different video on slide change (mobile)
  if (window.innerWidth < 1024) {
    thumbsSlider.on('slideChange', function () {
      let activeIndex = thumbsSlider.activeIndex - 2;
      let slideTo = thumbSlides[activeIndex].dataset.slideTo;

      gallerySlider.slideTo(slideTo);

      let galleryVideos = document.querySelectorAll('.video-section-3 .gallery-slider video');
      let galleryVideo = gallerySlides[slideTo].querySelector('video');

      galleryVideos.forEach((video) => {
        video.pause();
        galleryVideo.currentTime = 0;
      });

      galleryVideo.play();
    });
  }
}

/* #ScrollSpy
================================================== */
if (document.querySelector('.configurator-page')) {
  let section = document.querySelectorAll(".configurator-page .section");
  
  if (section) {
    let sections = {};
    let i = 0;
  
    Array.prototype.forEach.call(section, function (e) {
      sections[e.id] = e.offsetTop;
    });
  
    window.onscroll = function () {
      let scrollPosition;
      if (window.innerWidth > 1023) {
        scrollPosition = (document.documentElement.scrollTop || document.body.scrollTop) - 300;
      } else {
        scrollPosition = (document.documentElement.scrollTop || document.body.scrollTop) + 150;
      }
  
      for (i in sections) {
        if (sections[i] <= scrollPosition) {
          document.querySelector('.sidebar-links a.active').setAttribute('class', ' ');
          document.querySelector('.sidebar-links a[href*=' + i + ']').setAttribute('class', 'active');
        }
      }
    };
  }
}

/* #Configurator Color
================================================== */
if (document.querySelector('.configurator-color .swiper-container')) {
  new Swiper(".configurator-color .swiper-container", {
    slidesPerView: 1,
    pagination: {
      el: ".configurator-color .swiper-container .swiper-pagination",
    },
  });
}

/* #Configurator Interior
================================================== */
if (document.querySelector('.configurator-interior .swiper-container')) {
  new Swiper(".configurator-interior .swiper-container", {
    slidesPerView: 1,
    pagination: {
      el: ".configurator-interior .swiper-container .swiper-pagination",
    },
  });
}

/* #Popup
================================================== */
const popupTogglers = document.querySelectorAll('.popup-toggler');
const popups = document.querySelectorAll('.popup');
const body = document.querySelector('body');

// Popup Handler
const popupHandler = (popup) => {
  body.classList.add('no-scroll');
  popup.classList.add('show');
};

// Disable Animation Lag at page load
popups.forEach((popup) => {
  gsap.set(popup, {
    display: 'block'
  });
});

// Popup Toggler
popupTogglers.forEach((toggler) => {
  toggler.addEventListener('click', (e) => {
    e.preventDefault();

    const popup = document.querySelector(toggler.dataset.toggle);

    popupHandler(popup);
  });
});

// Close Btn
popups.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    e.preventDefault();

    // Close Btn
    if (e.target.closest('.popup-close')) {
      body.classList.remove('no-scroll');
      popup.classList.remove('show');
    }
  })
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (document.querySelector('.popup.show') && e.target.closest('.popup-backdrop')) {
    document.querySelector('.popup.show').classList.remove('show');
    body.classList.remove('no-scroll');
  }
});

/* #ScrollSpy
================================================== */
if (document.querySelector('.u5-page') || document.querySelector('.u6-page')) {

  // Handling link marking
  let section = '';
  if (document.querySelector('.u5-page')) {
    section = document.querySelectorAll(".u5-page .section");
  }
  if (document.querySelector('.u6-page')) {
    section = document.querySelectorAll(".u6-page .section");
  }
  
  if (section) {
    let sections = {};
    let i = 0;
    
    Array.prototype.forEach.call(section, function(e) {
      sections[e.id] = e.offsetTop;
    });
    
    window.onscroll = function() {
      let scrollPosition = '';

      if (window.innerWidth > 1024) {
        scrollPosition = ((document.documentElement.scrollTop + 350) || (document.body.scrollTop + 350));
      } else {
        scrollPosition = ((document.documentElement.scrollTop + 100) || (document.body.scrollTop + 100));
      }
    
      for (i in sections) {
        if (sections[i] <= scrollPosition) {
          if (document.querySelector('.scroll-spy .active')) {
            document.querySelector('.scroll-spy .active').setAttribute('class', ' ');
          }
          document.querySelector('.scroll-spy a[href*=' + i + ']').setAttribute('class', 'active');
        }
      }
    };
  }

  // Handling link clicks
  const scrollSpyLinks = document.querySelectorAll('.scroll-spy a');

  scrollSpyLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const id = link.hash;
      let yOffset = 0;

      if (window.innerWidth > 1024) {
        yOffset = -95;
      } else {
        yOffset = -100;
      }
      
      const element = document.querySelector(id);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({top: y, behavior: 'smooth'});
    });
  });
}

/* #U5 Sticky
================================================== */
const u5Sticky = document.querySelector('.u5-sticky');

if  (u5Sticky) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      u5Sticky.classList.add('scrolled');
    } else {
      u5Sticky.classList.remove('scrolled');
    }
  });
  
  if (window.scrollY > 50) {
    u5Sticky.classList.add('scrolled');
  } else {
    u5Sticky.classList.remove('scrolled');
  }
  
  if (document.querySelector('.u5-sticky .swiper-container')) {
    new Swiper(".u5-sticky .swiper-container", {
      direction: "vertical",
      slidesPerView: 1,
      allowTouchMove: false,
      loop: true,
      autoplay: {
        delay: 2500,
      },
    });
  }
}

/* #U5 Sticky 2
================================================== */
const heroMessage = document.querySelector('.u5-hero .message');

if  (heroMessage) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      heroMessage.classList.add('scrolled');
    } else {
      heroMessage.classList.remove('scrolled');
    }
  });
  
  if (window.scrollY > 50) {
    heroMessage.classList.add('scrolled');
  } else {
    heroMessage.classList.remove('scrolled');
  }
}

/* #U5 Videos
================================================== */
if (window.innerWidth > 1023) {
  const u5Videos = document.querySelectorAll('.u5-videos .video');

  u5Videos.forEach((video) => {
    const videoLink = video.querySelector('a');
    const videoEl = video.querySelector('video');
    
    videoLink.addEventListener('mouseenter', (e) => {
      video.classList.add('show');
      videoEl.play();
    });
    
    videoLink.addEventListener('mouseleave', (e) => {
      video.classList.remove('show');
      videoEl.pause();
      setTimeout(function(){ 
        videoEl.currentTime = 0;
       }, 300);
    });
  });
}

/* #U5 Design Slider
================================================== */
if (document.querySelector('.u5-design .swiper-container')) {
  new Swiper(".u5-design .swiper-container", {
    
    pagination: {
      el: ".u5-design .swiper-container .swiper-pagination",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.25,
        slidesPerColumn: 3,
        slidesPerGroup: 2.5,
        slidesPerColumnFill: 'row',
        centeredSlides: true
      },
      1024: {
        slidesPerView: 3,
        slidesPerColumn: 3,
        slidesPerGroup: 3,
        slidesPerColumnFill: 'row',
        centeredSlides: false
      }
    }
  });
}

/* #U5 Design Videos Slider
================================================== */
if (document.querySelector('.popup-design-videos .swiper-container')) {
  const designVideoPopupTogglers = document.querySelectorAll('.u5-design .img .popup-toggler');

  const designVideoSlider = new Swiper(".popup-design-videos .swiper-container", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".popup-design-videos .swiper-button-next",
      prevEl: ".popup-design-videos .swiper-button-prev",
    },
  });

  designVideoPopupTogglers.forEach((toggler) => {
    const slideTo = toggler.dataset.slideTo - 1;

    toggler.addEventListener('click', (e) => {
      designVideoSlider.slideTo(slideTo, 0);
    });
  });
}

/* #U5 Page Header/ScrollSpy 
================================================== */
let scrollPos = 0;

if (document.querySelector('.u5-page') || document.querySelector('.u6-page')) {
  if (window.innerWidth < 1024) {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY > 0 && (document.body.getBoundingClientRect()).top < scrollPos) {
        body.classList.add('hide-top');
        body.classList.add('show-bottom');
      } else if (window.scrollY > 0 && (document.body.getBoundingClientRect()).top > scrollPos) {
        body.classList.add('show-bottom');
        body.classList.remove('hide-top');
      }
    
      if (window.scrollY == 0) {
        body.classList.remove('hide-top');
        body.classList.remove('show-bottom');
      }
    
      scrollPos = (document.body.getBoundingClientRect()).top;
    });
  }
}

/* #Premium Popup Table
================================================== */
const premiumPopupTable = document.querySelector('.popup-premium .table');

if (premiumPopupTable) {
  premiumPopupTable.addEventListener('click', (e) => {
    if (e.target.closest('.plus')) {
      premiumPopupTable.classList.add('show-standard');
    }

    if (e.target.closest('.minus')) {
      premiumPopupTable.classList.remove('show-standard');
    }
  });
}