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

<script>
  (function(){
    const form = document.getElementById('quoteForm');
    if(!form) return;

    const status = form.querySelector('.form-status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = 'Sending…';

      try{
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if(res.ok){
          form.reset();
          status.classList.add('success');
          status.textContent = 'Thanks — we received your request. We’ll reply with pricing and lead time.';
        }else{
          status.classList.add('error');
          status.textContent = 'Something went wrong. Please try again or email us directly.';
        }
      }catch(err){
        status.classList.add('error');
        status.textContent = 'Network error. Please try again or email us directly.';
      }
    });
  })();
</script>

