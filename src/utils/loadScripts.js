const SCRIPT_CHAIN = [
  '/assets/js/jquery.js',
  '/assets/js/popper.min.js',
  '/assets/js/bootstrap.min.js',
  '/assets/js/plugins.js',
  '/assets/js/owl.js',
  '/assets/js/wow.js',
  '/assets/js/validation.js',
  '/assets/js/jquery.fancybox.js',
  '/assets/js/appear.js',
  '/assets/js/scrollbar.js',
  '/assets/js/isotope.js',
  '/assets/js/jquery.nice-select.min.js',
  '/assets/js/jquery-ui.js',
  '/assets/js/parallax-scroll.js',
];

let scriptsLoaded = false;
let loadingPromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-template-src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.dataset.templateSrc = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

export function loadTemplateScripts() {
  if (scriptsLoaded) {
    return Promise.resolve();
  }

  if (!loadingPromise) {
    loadingPromise = SCRIPT_CHAIN.reduce(
      (promise, src) => promise.then(() => loadScript(src)),
      Promise.resolve()
    ).then(() => {
      scriptsLoaded = true;
    });
  }

  return loadingPromise;
}
