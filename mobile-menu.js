document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // --- Safe Lazy Load / Fade In Animation Logic ---
    // Hanya jalankan jika browser mendukung IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Target semua section kecuali hero
        const sectionsToAnimate = document.querySelectorAll('section:not(#home)');
        sectionsToAnimate.forEach(section => {
            // Tambahkan class fade-in-section (yang mengatur opacity:0 di CSS)
            section.classList.add('fade-in-section');
            observer.observe(section);
        });
    }
    // Jika browser tidak support IntersectionObserver, 
    // section tetap visible karena default CSS opacity: 1
});