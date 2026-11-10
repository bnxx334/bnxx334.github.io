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
    const sectionsToAnimate = document.querySelectorAll('section:not(#home)');

    const show = (el) => el.classList.add('is-visible');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    show(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

        sectionsToAnimate.forEach(section => {
            section.classList.add('fade-in-section');
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                show(section);
            } else {
                observer.observe(section);
            }
        });

        // Fallback: pastikan konten tampil jika observer tidak terpanggil
        setTimeout(() => {
            sectionsToAnimate.forEach(show);
        }, 1500);
    }
    // Jika browser tidak support IntersectionObserver, section tetap visible (default CSS)
});