// js/router.js

const app = document.getElementById('app');

// ▫️ Optional: prevent the browser from auto-restoring scroll when you swap content
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

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
  // Get the full hash (e.g. "/home#services" or "/project1")
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

    // 🔹 NEW: immediately clear any leftover scroll from the previous page
    app.scrollTop = 0;
    // (Optional) also nudge the window scroll in case you ever fall back to body‐scroll
    window.scrollTo(0, 0);

    // 🔹 NEW: initialize project1-specific scripts if needed
    if (route === '/project1') {
      initProject1Video();
      initProject1Iframe();
    }

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
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
  // Otherwise (no fragment or project pages), scroll the #app container to top
  else {
    app.scrollTo({ top: 0, behavior: 'smooth' });
    // (Optional) also scroll the window
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Run on initial load and whenever the hash changes
window.addEventListener('DOMContentLoaded', loadRoute);
window.addEventListener('hashchange',      loadRoute);

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
      // Already at home → just reset scroll to top
      app.scrollTop = 0;
      window.scrollTo(0, 0);
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

// 🔹 Delegated form-submit handler for your contact form 🔹
document.addEventListener('submit', async e => {
  const form = e.target;
  if (form.id !== 'myForm') return;   // only intercept your contact form

  e.preventDefault();                  // stop the default page-reload submission

  const formData = new FormData(form);
  const successMessage = document.getElementById('successMessage');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      successMessage.style.display = 'block';
      form.reset();
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    } else {
      console.error('Error:', response.status, response.statusText);
      alert('Failed to submit the form.');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('An error occurred while submitting the form.');
  }
});

// 🔹 NEW: helper to autoplay/pause video in project1 via IntersectionObserver
function initProject1Video() {
  const video = document.getElementById("heroVideo");
  if (!video) return;
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        entry.isIntersecting ? video.play() : video.pause();
      });
    },
    { threshold: 0.6 }
  );
  observer.observe(video);
}

// 🔹 NEW: helper to fix iframe background in project1 after load
function initProject1Iframe() {
  const iframe = document.getElementById("hotelFrame");
  if (!iframe) return;
  iframe.addEventListener("load", () => {
    setTimeout(() => {
      iframe.style.backgroundColor = "#fff";
    }, 3000);
  });
}
