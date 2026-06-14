const loadedStyles = new Set();

export function loadStylesheet(href) {
  if (loadedStyles.has(href) || document.querySelector(`link[data-template-style="${href}"]`)) {
    loadedStyles.add(href);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.templateStyle = href;
    link.onload = () => {
      loadedStyles.add(href);
      resolve();
    };
    link.onerror = () => reject(new Error(`Failed to load ${href}`));
    document.head.appendChild(link);
  });
}

export function loadDeferredStyles() {
  const deferred = [
    '/assets/css/animate.css',
    '/assets/css/owl.css',
  ];

  return Promise.all(deferred.map(loadStylesheet));
}
