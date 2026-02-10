document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    const closeNav = () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close on link click
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => closeNav());
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      const target = e.target;
      const clickedInside = nav.contains(target) || toggle.contains(target);
      if (!clickedInside) closeNav();
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }
});

