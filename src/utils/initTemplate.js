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
      smartSpeed: prefersReducedMotion ? 0 : 1000,
      autoplay: prefersReducedMotion ? false : 6000,
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

  if ($('.wow').length && window.WOW) {
    const wow = new window.WOW({ mobile: false });
    wow.init();
  }

  if ($('#datepicker').length && $.fn.datepicker) {
    $('#datepicker').datepicker();
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
}

function handlePreloader($) {
  if (!$('.loader-wrap').length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const delay = prefersReducedMotion ? 0 : 800;
  const fade = prefersReducedMotion ? 0 : 400;

  $('.loader-wrap').delay(delay).fadeOut(fade);
}

export async function initializeTemplate() {
  const $ = window.jQuery;
  if (!$) return;

  destroyCarousels($);
  initMobileMenu($);
  initCarousels($);
  initInteractions($);
  handlePreloader($);

  if ($.fn.isotope && $('.items-container').length) {
    $('.items-container').isotope({ layoutMode: 'masonry' });
  }
}

export function bindScrollHandlers() {
  const $ = window.jQuery;
  if (!$) return () => {};

  const onScroll = () => {
    if ($('.main-header').length) {
      const windowpos = $(window).scrollTop();
      const siteHeader = $('.main-header');
      const scrollLink = $('.scroll-to-top');
      if (windowpos >= 110) {
        siteHeader.addClass('fixed-header');
        scrollLink.addClass('open');
      } else {
        siteHeader.removeClass('fixed-header');
        scrollLink.removeClass('open');
      }
    }

    if ($(window).scrollTop() > 200) {
      $('.scroll-top-inner').addClass('visible');
    } else {
      $('.scroll-top-inner').removeClass('visible');
    }
  };

  $(window).off('scroll.template').on('scroll.template', onScroll);
  onScroll();

  return () => {
    $(window).off('scroll.template');
  };
}
