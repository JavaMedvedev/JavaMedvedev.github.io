// js/router.js

const app = document.getElementById('app');

const routes = {
  '/':         'pages/home.html',
  '/home':     'pages/home.html',

  // project pages:
  '/project1': 'pages/project1.html',
  '/project2': 'pages/project2.html',
  '/project3': 'pages/project3.html',
  '/project4': 'pages/project4.html'
};

let lastPath = null;

async function loadRoute() {
  // Get the full hash (e.g. "/home#services" or "project2")
  const fullHash        = location.hash.slice(1) || '/';
  const [route, section] = fullHash.split('#');
  const path            = routes[route] || routes['/'];

  // If we've already loaded this HTML file, skip re-fetch and just scroll
  if (path === lastPath) {
    scrollAccordingly(route, section);
    return;
  }
  lastPath = path;

  // Otherwise fetch and render the new content
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Fetch error');
    app.innerHTML = await res.text();
    scrollAccordingly(route, section);
  } catch {
    app.innerHTML = `
      <section class="page-container">
        <h1>Page not found</h1>
        <p>Sorry, we couldn’t load that page.</p>
      </section>`;
  }
}

function scrollAccordingly(route, section) {
  // If we're on home ("/" or "/home") and a section is specified, scroll to it
  if ((route === '/' || route === '/home') && section) {
    setTimeout(() => {
      document
        .getElementById(section)
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }
  // Otherwise (no fragment or project pages), scroll to top
  else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Run on initial load and whenever the hash changes
window.addEventListener('DOMContentLoaded', loadRoute);
window.addEventListener('hashchange', loadRoute);

// Delegated click handler for all in-app links (including your hero "About me" button)
document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#/"]');
  if (!link) return;
  e.preventDefault();

  const target = link.getAttribute('href'); // e.g. "#/", "#/home#about", "#/project3"

  // Home link (either "#/" or "#")
  if (target === '#/' || target === '#') {
    if (location.hash !== '#/' && location.hash !== '') {
      // Navigate back to home, firing hashchange → loadRoute()
      location.hash = '#/';
    } else {
      // Already at home → just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  // Any other in-app link
  else {
    if (location.hash !== target) {
      // Changing the hash will fire hashchange → loadRoute()
      location.hash = target;
    } else {
      // Same hash → re-run loadRoute to trigger the scroll logic
      loadRoute();
    }
  }
});
