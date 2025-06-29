// js/router.js

const app = document.getElementById('app');

const routes = {
  '/':         'pages/home.html',
  '/home':     'pages/home.html',
  '/project1': 'pages/project1.html',
  '/project2': 'pages/project2.html',
  '/project3': 'pages/project3.html',
  '/project4': 'pages/project4.html'
};

let lastPath = null;

async function loadRoute() {
  const fullHash       = location.hash.slice(1) || '/';   // e.g. "/home#services" or "/project1"
  const [route, section] = fullHash.split('#');           // ["﻿/home","services"] or ["project1"]
  const path = routes[route] || routes['/'];              // fallback to home.html

  // If we're already on this HTML, skip the fetch
  if (path === lastPath) {
    scrollAccordingly(route, section);
    return;
  }
  lastPath = path;

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
  // Home page sections
  if ((route === '/' || route === '/home') && section) {
    setTimeout(() => {
      document.getElementById(section)
              ?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }
  // Home button (no fragment) or project pages
  else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Wire up initial load + hash changes
window.addEventListener('DOMContentLoaded', loadRoute);
window.addEventListener('hashchange', loadRoute);

// Unified nav-link handler
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('href'); // e.g. "#/", "#/home#about", "#/project1"

    // If Home link
    if (target === '#/' || target === '#') {
      // Change hash if needed (fires loadRoute via hashchange)
      if (location.hash !== '#/' && location.hash !== '') {
        location.hash = '#/';
      } else {
        // Already home → just scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    // Any other link (sections or projects)
    else {
      if (location.hash !== target) {
        location.hash = target;
      } else {
        // Same hash → re-run router to scroll
        loadRoute();
      }
    }
  });
});