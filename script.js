document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link tap
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('is-open')) return;
      const within = nav.contains(e.target) || toggle.contains(e.target);
      if (!within) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Dropdown button ARIA (desktop hover still works)
  const ddBtn = document.querySelector('.nav__dropdown-btn');
  if (ddBtn) {
    ddBtn.addEventListener('click', () => {
      // On desktop, hover handles it; on mobile, menu is always visible.
      const expanded = ddBtn.getAttribute('aria-expanded') === 'true';
      ddBtn.setAttribute('aria-expanded', String(!expanded));
    });
  }
});
