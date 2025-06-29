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
  const fullHash   = location.hash.slice(1) || '/';      // e.g. "/home#services" or "/project1"
  const [route, section] = fullHash.split('#');          // separate out any fragment
  const path = routes[route] || routes['/'];             // fallback to home.html

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Fetch error');
    app.innerHTML = await res.text();

    // only scroll for in-page HOME sections
    if ((route === '/' || route === '/home') && section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      // for project pages or plain home, scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

  } catch {
    app.innerHTML = `
      <section class="page-container">
        <h1>Page not found</h1>
        <p>Sorry, we couldn’t load that page.</p>
      </section>`;
  }
}

window.addEventListener('DOMContentLoaded', loadRoute);
window.addEventListener('hashchange', loadRoute);

// force the router (and scroll) to run on *any* nav-link click
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    // give the browser a tick to update location.hash
    setTimeout(loadRoute, 0);
  });
});
