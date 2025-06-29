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

async function loadRoute() {
  const fullHash   = location.hash.slice(1) || '/';      // e.g. "home#services" or "project1"
  const [route, section] = fullHash.split('#');          // ["home","services"]
  const path = routes[route] || routes['/'];             // fallback to home.html

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Fetch error');
    app.innerHTML = await res.text();

    // If we're on home and have a fragment, scroll there:
    if ((route === '/' || route === '/home') && section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      // Otherwise (project pages or plain home), scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

  } catch {
    app.innerHTML = `
      <section class="page-container">
        <h1>Page not found</h1>
        <p>Sorry, we couldn’t load that page.</p>
      </section>
    `;
  }
}

// Initial load and when the hash changes:
window.addEventListener('DOMContentLoaded', loadRoute);
window.addEventListener('hashchange', loadRoute);

// Handle nav‐link clicks so that clicking the same hash still scrolls correctly:
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetHash = link.getAttribute('href');

    if (location.hash === targetHash) {
      // Same hash → re‐run loadRoute to trigger the scroll logic
      loadRoute();
    } else {
      // New hash → update it, which fires hashchange → loadRoute
      location.hash = targetHash;
    }
  });
});
