document.addEventListener("DOMContentLoaded", () => {
  // footer year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // mobile menu
  const btn = document.querySelector(".navbtn");
  const nav = document.querySelector(".nav");
  const close = () => {
    if (!btn || !nav) return;
    nav.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  };

  if (btn && nav) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!nav.contains(t) && !btn.contains(t)) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // quote form -> email draft (no backend)
  const form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // TODO: set your real email here
      const emailTo = "sales@yourdomain.com";

      const fd = new FormData(form);
      const get = (k) => (fd.get(k) || "").toString().trim();

      const subject = `Quote Request — ${get("company") || get("name") || "Yevro Polycarbonate"}`;
      const body =
`Quote Request

Name: ${get("name")}
Company: ${get("company")}
Email: ${get("email")}
Phone: ${get("phone")}

Product: ${get("product")}
Delivery term: ${get("incoterm")}
Thickness / Structure / Color: ${get("spec")}
Volume: ${get("volume")}
Destination (Canada): ${get("destination")}

Message:
${get("message")}
`;

      window.location.href =
        `mailto:${encodeURIComponent(emailTo)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
});
