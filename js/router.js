const app = document.getElementById('app');
const loader = document.getElementById('loader');

async function loadSection(section) {
  loader.style.display = 'block';

  try {
    const res = await fetch(`sections/${section}.html`, { cache: 'no-cache' });
    if (!res.ok) throw new Error('404');

    const html = await res.text();
    app.innerHTML = html;

    // Ejecutar scripts internos del HTML
    const scripts = app.querySelectorAll("script");
    scripts.forEach(oldScript => {
      const newScript = document.createElement("script");

      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }

      document.body.appendChild(newScript);
      oldScript.remove();
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch {
    app.innerHTML = `
      <section>
        <h1>Error 404</h1>
        <p>Sección no encontrada.</p>
        <button onclick="location.hash='home'">Ir a inicio</button>
      </section>`;
  }

  loader.style.display = 'none';
}

function route() {
  const hash = location.hash.replace('#', '') || 'home';
  loadSection(hash);
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);
