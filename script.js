document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-menu');
    const toggleIcon = document.querySelector('.mobile-toggle i');
    
    // Toggle Mobile Menu
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Switch Icon between Bars and X
        if (nav.classList.contains('active')) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-times');
        } else {
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
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
/* =========================================
   FORMSPREE AJAX SUBMISSION
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Stop page from reloading
            
            const data = new FormData(event.target);
            
            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success!
                    status.innerHTML = "Thanks! We have received your inquiry and will be in touch shortly.";
                    status.className = "form-status success"; // Applies your Green CSS
                    form.reset(); // Clear the form
                } else {
                    // Error from Formspree
                    const result = await response.json();
                    if (Object.hasOwn(result, 'errors')) {
                        status.innerHTML = result.errors.map(error => error.message).join(", ");
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form.";
                    }
                    status.className = "form-status error"; // Applies your Red CSS
                }
            } catch (error) {
                // Network error
                status.innerHTML = "Oops! There was a network problem.";
                status.className = "form-status error";
            }
        });
    }
});
