document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Form Submission Handling (Optional - prevents redirect for demo)
    const form = document.getElementById('quoteForm');
    if(form) {
        form.addEventListener('submit', function(e) {
            // If you are NOT using a real backend (like Formspree), uncomment below to see alert
            // e.preventDefault();
            // alert('Thank you! This is a demo. Configure Formspree or a backend to receive emails.');
            // form.reset();
        });
    }

    // Navbar Scroll Effect (Optional shadow on scroll)
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 2px 15px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }
    });
});
