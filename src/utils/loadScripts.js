import { loadStylesheet } from './loadStyles';

const CORE_AFTER_JQUERY = [
  '/assets/js/popper.min.js',
  '/assets/js/bootstrap.min.js',
  '/assets/js/plugins.js',
];

const OPTIONAL_SCRIPTS = {
  fancybox: '/assets/js/jquery.fancybox.js',
  jqueryUi: '/assets/js/jquery-ui.js',
  niceSelect: '/assets/js/jquery.nice-select.min.js',
  parallax: '/assets/js/parallax-scroll.js',
  owl: '/assets/js/owl.js',
  wow: '/assets/js/wow.js',
  appear: '/assets/js/appear.js',
};

const OPTIONAL_STYLES = {
  fancybox: '/assets/css/jquery.fancybox.min.css',
  jqueryUi: '/assets/css/jquery-ui.css',
  owl: '/assets/css/owl.css',
  animate: '/assets/css/animate.css',
};

let scriptsLoaded = false;
let loadingPromise = null;
const loadedSrc = new Set();

function loadScript(src) {
  if (loadedSrc.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-template-src="${src}"]`);
    if (existing) {
      loadedSrc.add(src);
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.dataset.templateSrc = src;
    script.defer = true;
    script.onload = () => {
      loadedSrc.add(src);
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

function getConditionalScripts() {
  const scripts = [];

  if (document.querySelector('.owl-carousel')) {
    scripts.push(OPTIONAL_SCRIPTS.owl);
  }

  if (document.querySelector('.wow')) {
    scripts.push(OPTIONAL_SCRIPTS.wow, OPTIONAL_SCRIPTS.appear);
  }

  return scripts;
}

function getConditionalStyles() {
  const styles = [];

  if (document.querySelector('.owl-carousel')) {
    styles.push(OPTIONAL_STYLES.owl);
  }

  if (document.querySelector('.wow')) {
    styles.push(OPTIONAL_STYLES.animate);
  }

  return styles;
}

export function loadTemplateScripts() {
  if (scriptsLoaded) {
    return Promise.resolve();
  }

  if (!loadingPromise) {
    loadingPromise = loadScript('/assets/js/jquery.js')
      .then(() => Promise.all(CORE_AFTER_JQUERY.map(loadScript)))
      .then(() => Promise.all(getConditionalScripts().map(loadScript)))
      .then(() => Promise.all(getConditionalStyles().map(loadStylesheet)))
      .then(() => {
        scriptsLoaded = true;
      });
  }

  return loadingPromise;
}

export async function loadPageEnhancements() {
  await loadTemplateScripts();

  const $ = window.jQuery;
  if (!$) return;

  const scriptLoads = [];
  const styleLoads = [];

  if ($('.lightbox-image').length) {
    scriptLoads.push(loadScript(OPTIONAL_SCRIPTS.fancybox));
    styleLoads.push(loadStylesheet(OPTIONAL_STYLES.fancybox));
  }

  if ($('#datepicker').length || $('select.wide').length) {
    scriptLoads.push(loadScript(OPTIONAL_SCRIPTS.jqueryUi));
    scriptLoads.push(loadScript(OPTIONAL_SCRIPTS.niceSelect));
    styleLoads.push(loadStylesheet(OPTIONAL_STYLES.jqueryUi));
  }

  if ($('[data-parallax]').length) {
    scriptLoads.push(loadScript(OPTIONAL_SCRIPTS.parallax));
  }

  await Promise.all([...styleLoads, ...scriptLoads]);
}

export function primeTemplateScripts() {
  const needsSoon =
    document.querySelector('.banner-carousel, .owl-carousel, .wow, [data-parallax]') != null;

  if (needsSoon) {
    return loadTemplateScripts();
  }

  if (typeof window.requestIdleCallback === 'function') {
    return new Promise((resolve) => {
      window.requestIdleCallback(
        () => {
          loadTemplateScripts().then(resolve);
        },
        { timeout: 2000 },
      );
    });
  }

  return new Promise((resolve) => {
    window.setTimeout(() => {
      loadTemplateScripts().then(resolve);
    }, 400);
  });
}
