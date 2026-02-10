document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-menu');
    
    // Toggle Mobile Menu
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Navbar Shadow on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.boxShadow = "none";
            header.style.borderBottom = "1px solid #E2E8F0";
        }
    });
});
