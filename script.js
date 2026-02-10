document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  const closeNav = () => {
    if (!nav || !btn) return;
    nav.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  };

  if (btn && nav) {
    btn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));

    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!nav.contains(t) && !btn.contains(t)) closeNav();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Highlight nav link for the section in view
  const links = Array.from(document.querySelectorAll(".nav__link"));
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === id));
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );
    sections.forEach((s) => io.observe(s));
  }

  // Quote form -> open prefilled email draft
  const form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // TODO: Replace with your real sales email
      const emailTo = "sales@yourdomain.com";

      const data = new FormData(form);
      const get = (k) => (data.get(k) || "").toString().trim();

      const subject = `Quote Request — ${get("company") || get("name") || "Yevro Polycarbonate"}`;
      const body =
`Quote Request

Name: ${get("name")}
Company: ${get("company")}
Email: ${get("email")}
Phone: ${get("phone")}

Product: ${get("product")}
Incoterm: ${get("incoterm")}
Thickness / Structure / Color: ${get("spec")}
Volume: ${get("volume")}
Destination (Canada): ${get("destination")}

Message:
${get("message")}
`;

      const mailto = `mailto:${encodeURIComponent(emailTo)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
});

