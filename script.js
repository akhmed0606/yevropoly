document.addEventListener('DOMContentLoaded', function() {
    
    /* =========================================
       1. VARIABLES
       ========================================= */
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Get the icon inside the toggle button safely
    const toggleIcon = mobileToggle ? mobileToggle.querySelector('i') : null;

    /* =========================================
       2. MOBILE MENU LOGIC
       ========================================= */
    // Toggle Menu on Hamburger Click
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Switch Icon
            if (navMenu.classList.contains('active')) {
                toggleIcon.classList.remove('fa-bars');
                toggleIcon.classList.add('fa-times');
            } else {
                toggleIcon.classList.remove('fa-times');
                toggleIcon.classList.add('fa-bars');
            }
        });
    }

    // Close Menu when a Link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-times');
                toggleIcon.classList.add('fa-bars');
            }
        });
    });

    /* =========================================
       3. HEADER SHADOW ON SCROLL
       ========================================= */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.boxShadow = "none";
        }
    });

    /* =========================================
       4. FORMSPREE AJAX SUBMISSION
       ========================================= */
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Stop page from reloading
            
            const data = new FormData(event.target);
            
            // Show loading state
            if (status) {
                status.innerHTML = "Sending...";
                status.className = "form-status"; 
            }

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
                    if (status) {
                        status.innerHTML = "Thanks! We have received your inquiry and will be in touch shortly.";
                        status.className = "form-status success"; // Green styling
                    }
                    form.reset(); // Clear the form
                } else {
                    // Error from Formspree
                    const result = await response.json();
                    if (status) {
                        if (result.errors) {
                            status.innerHTML = result.errors.map(error => error.message).join(", ");
                        } else {
                            status.innerHTML = "Oops! There was a problem submitting your form.";
                        }
                        status.className = "form-status error"; // Red styling
                    }
                }
            } catch (error) {
                // Network error
                if (status) {
                    status.innerHTML = "Oops! There was a network problem.";
                    status.className = "form-status error";
                }
            }
        });
    }
});
