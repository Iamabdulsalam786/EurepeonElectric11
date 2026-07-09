function destroyCarousels($) {
  $('.owl-carousel').each(function () {
    const $carousel = $(this);
    if ($carousel.hasClass('owl-loaded')) {
      $carousel.trigger('destroy.owl.carousel');
      $carousel.removeClass('owl-loaded owl-drag');
      $carousel.find('.owl-stage-outer').children().unwrap();
    }
  });
}

function initCarousels($) {
  const navText = ['<span class="fal fa-angle-left"></span>', '<span class="fal fa-angle-right"></span>'];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ($('.banner-carousel').length) {
    $('.banner-carousel').owlCarousel({
      loop: !prefersReducedMotion,
      margin: 0,
      nav: true,
      animateOut: prefersReducedMotion ? false : 'fadeOut',
      animateIn: prefersReducedMotion ? false : 'fadeIn',
      active: true,
      smartSpeed: prefersReducedMotion ? 0 : 1800,
      autoplay: !prefersReducedMotion,
      autoplayTimeout: 6000,
      autoplaySpeed: prefersReducedMotion ? 0 : 1800,
      autoplayHoverPause: true,
      navText,
      responsive: { 0: { items: 1 }, 600: { items: 1 }, 800: { items: 1 }, 1024: { items: 1 } },
    });
  }

  const carouselConfigs = [
    {
      selector: '.single-item-carousel',
      options: {
        loop: true, margin: 30, nav: true, smartSpeed: 500, autoplay: 1000, navText,
        responsive: { 0: { items: 1 }, 480: { items: 1 }, 600: { items: 1 }, 800: { items: 1 }, 1200: { items: 1 } },
      },
    },
    {
      selector: '.two-item-carousel',
      options: {
        loop: true, margin: 30, nav: true, smartSpeed: 500, autoplay: 1000, navText,
        responsive: { 0: { items: 1 }, 480: { items: 1 }, 600: { items: 1 }, 800: { items: 2 }, 1200: { items: 2 } },
      },
    },
    {
      selector: '.three-item-carousel',
      options: {
        loop: true, margin: 30, nav: true, smartSpeed: 500, autoplay: 1000, navText,
        responsive: { 0: { items: 1 }, 480: { items: 1 }, 600: { items: 2 }, 800: { items: 2 }, 1200: { items: 3 } },
      },
    },
    {
      selector: '.four-item-carousel',
      options: {
        loop: true, margin: 30, nav: true, smartSpeed: 500, autoplay: 1000, navText,
        responsive: { 0: { items: 1 }, 480: { items: 1 }, 600: { items: 2 }, 800: { items: 3 }, 1200: { items: 4 } },
      },
    },
    {
      selector: '.five-item-carousel',
      options: {
        loop: true, margin: 30, nav: true, smartSpeed: 500, autoplay: 1000, navText,
        responsive: { 0: { items: 1 }, 480: { items: 2 }, 600: { items: 3 }, 800: { items: 4 }, 1200: { items: 5 } },
      },
    },
    {
      selector: '.project-carousel',
      options: {
        loop: true, margin: 0, nav: true, smartSpeed: 500, autoplay: 1000, navText,
        responsive: { 0: { items: 1 }, 480: { items: 1 }, 600: { items: 2 }, 800: { items: 3 }, 1200: { items: 4 } },
      },
    },
    {
      selector: '.project-carousel-2',
      options: {
        loop: true, margin: 50, nav: true, smartSpeed: 500, autoplay: 1000, navText,
        responsive: { 0: { items: 1 }, 480: { items: 1 }, 600: { items: 1 }, 800: { items: 1 }, 1200: { items: 1 } },
      },
    },
  ];

  carouselConfigs.forEach(({ selector, options }) => {
    if ($(selector).length) {
      $(selector).owlCarousel(options);
    }
  });

  if ($('.theme_carousel').length) {
    $('.theme_carousel').each(function () {
      const $owlAttr = {};
      const $extraAttr = $(this).data('options');
      $.extend($owlAttr, $extraAttr);
      $(this).owlCarousel($owlAttr);
    });
  }
}

function initMobileMenu($) {
  if (!$('.mobile-menu').length) return;

  if ($('[data-react-mobile-nav]').length) {
    $('.sticky-header .main-menu').empty();
    const desktopMenuContent = $('.main-header .header-lower .menu-area .main-menu').html();
    $('.sticky-header .main-menu').append(desktopMenuContent);
    return;
  }

  $('.mobile-menu .menu-box .menu-outer').empty();
  $('.sticky-header .main-menu').empty();

  const mobileMenuContent = $('.main-header .header-lower .menu-area .main-menu').html();
  $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
  $('.sticky-header .main-menu').append(mobileMenuContent);

  $('.main-header .navigation li.dropdown, .sticky-header .navigation li.dropdown').each(function () {
    if (!$(this).children('.dropdown-btn').length) {
      $(this).append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');
    }
  });
}

function initInteractions($) {
  if ($('.preloader-close').length) {
    $('.preloader-close').off('click').on('click', function () {
      $('.loader-wrap').delay(200).fadeOut(500);
    });
  }

  $('.mobile-nav-toggler').off('click').on('click', function () {
    $('body').addClass('mobile-menu-visible');
    $('.mobile-nav-toggler').attr('aria-expanded', 'true');
  });

  $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').off('click').on('click', function () {
    $('body').removeClass('mobile-menu-visible');
    $('.mobile-nav-toggler').attr('aria-expanded', 'false');
  });

  $('.search-toggler').off('click').on('click', function () {
    $('#search-popup').addClass('popup-visible');
  });

  $('#search-popup .close-search').off('click').on('click', function () {
    $('#search-popup').removeClass('popup-visible');
  });

  $('.scroll-to-top').off('click').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 1000);
  });

  // Reset WOW.js elements completely before re-initializing
  if (window.WOW) {
    // Clean up any existing WOW‑added attributes/classes/styles
    $('.wow').each(function() {
      $(this)
        .removeClass('animated')
        .removeAttr('style')
        .removeAttr('data-wow-animated')
        .css('visibility', 'visible'); // Make sure all WOW elements are visible initially
    });
    // Create a new WOW instance and initialize
    const wow = new window.WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true, // Enable on mobile
      live: true    // Live reload for dynamically added elements
    });
    wow.init();
  }



  if ($('.tabs-box').length) {
    $('.tabs-box .tab-buttons .tab-btn').off('click.tabs').on('click.tabs', function (e) {
      e.preventDefault();
      const target = $($(this).attr('data-tab'));
      if (target.is(':visible')) return false;
      $(this).parents('.tabs-box').find('.tab-buttons .tab-btn').removeClass('active-btn');
      $(this).addClass('active-btn');
      $(this).parents('.tabs-box').find('.tabs-content .tab').fadeOut(0).removeClass('active-tab');
      target.fadeIn(100).addClass('active-tab');
      return false;
    });
  }

  $('.overlay-anim-black-bg[data-animation="overlay-animation"]').addClass('overlay-animation');

  if ($.fn.scrollAnimations) {
    $('[data-animation]:not([data-animation-text]), [data-animation-box]').scrollAnimations();
  }

  // Accordion Box — CSS-driven fast transition (no jQuery slide animation)
  if ($('.accordion-box').length) {
    $('.accordion-box').off('click', '.acc-btn').on('click', '.acc-btn', function () {
      const outerBox = $(this).parents('.accordion-box');
      const target = $(this).parents('.accordion');

      const isAlreadyOpen = $(this).hasClass('active');

      if (isAlreadyOpen) {
        // clicking an open item: close it
        $(this).removeClass('active');
        target.removeClass('active-block');
        $(this).next('.acc-content').removeClass('acc-open');
      } else {
        // close all others in this box
        outerBox.find('.acc-btn').removeClass('active');
        outerBox.find('.acc-content').removeClass('acc-open');
        outerBox.children('.accordion').removeClass('active-block');
        // open this one
        $(this).addClass('active');
        target.addClass('active-block');
        $(this).next('.acc-content').addClass('acc-open');
      }
    });
  }
}

export function hidePreloader() {
  const wrap = document.querySelector('.loader-wrap');
  if (!wrap || wrap.dataset.hidden === 'true') return;

  wrap.dataset.hidden = 'true';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    wrap.style.display = 'none';
    return;
  }

  wrap.style.transition = 'opacity 0.28s ease';
  wrap.style.opacity = '0';
  window.setTimeout(() => {
    wrap.style.display = 'none';
  }, 280);
}

function handlePreloader($) {
  if (!$('.loader-wrap').length) return;
  hidePreloader();
}

function initFunfactCounters($) {
  $('.count-box').each(function () {
    const $box = $(this);
    const $text = $box.find('.count-text');
    const stop = $text.attr('data-stop');
    if (stop == null || stop === '') return;

    $text.text(stop);
    $box.addClass('counted');
  });
}

export async function initializeTemplate() {
  const $ = window.jQuery;
  if (!$) return;

  destroyCarousels($);
  initMobileMenu($);
  initCarousels($);
  initInteractions($);
  initFunfactCounters($);
  handlePreloader($);

  if ($.fn.isotope && $('.items-container').length) {
    $('.items-container').isotope({ layoutMode: 'masonry' });
  }
}

export function bindScrollHandlers() {
  const onScroll = () => {
    const windowpos = window.scrollY || document.documentElement.scrollTop;
    const siteHeader = document.querySelector('.main-header');
    const scrollLink = document.querySelector('.scroll-to-top');
    const scrollTopInner = document.querySelector('.scroll-top-inner');

    if (siteHeader) {
      if (windowpos >= 110) {
        siteHeader.classList.add('fixed-header');
        scrollLink?.classList.add('open');
      } else {
        siteHeader.classList.remove('fixed-header');
        scrollLink?.classList.remove('open');
      }
    }

    if (scrollTopInner) {
      if (windowpos > 200) {
        scrollTopInner.classList.add('visible');
      } else {
        scrollTopInner.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  return () => {
    window.removeEventListener('scroll', onScroll);
  };
}
