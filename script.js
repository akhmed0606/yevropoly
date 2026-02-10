document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  if (btn && nav) {
    const close = () => {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    };

    btn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });

    // close when clicking a link
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));

    // close when clicking outside
    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!nav.contains(t) && !btn.contains(t)) close();
    });

    // close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }
});
