const app = document.getElementById('app');

const routes = {
  '/':               'pages/home.html',
  '/home':           'pages/home.html',
  '/about':          'pages/about.html',
  '/e-learning':     'pages/e-learning.html',
  '/digital-museum': 'pages/digital-museum.html',
  '/web-mobile-apps':'pages/web-mobile-apps.html',
  '/design':         'pages/design.html',
  '/contacts':       'pages/contacts.html'
};

async function loadRoute() {
  const hash = location.hash.slice(1) || '/';
  const path = routes[hash] || 'pages/home.html';
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Fetch error');
    app.innerHTML = await res.text();
  } catch {
    app.innerHTML = `
      <section class="page-container">
        <h1>Page not found</h1>
        <p>Sorry, we couldn’t load that page.</p>
      </section>
    `;
  }
}

window.addEventListener('DOMContentLoaded', loadRoute);
window.addEventListener('hashchange', loadRoute);


