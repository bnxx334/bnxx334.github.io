document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) {
        return;
    }

    const setSubmenuState = (toggle, isExpanded) => {
        const dropdown = toggle.closest('.nav-item-dropdown');
        const label = dropdown?.querySelector('.nav-link')?.textContent.trim();

        toggle.setAttribute('aria-expanded', String(isExpanded));
        if (label) {
            toggle.setAttribute('aria-label', `${isExpanded ? 'Tutup' : 'Buka'} submenu ${label}`);
        }
        dropdown?.classList.toggle('submenu-open', isExpanded);
    };

    const closeNavigation = () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Buka navigasi');
        document.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
            setSubmenuState(toggle, false);
        });
    };

    hamburger.addEventListener('click', (event) => {
        event.stopPropagation();
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            closeNavigation();
            return;
        }

        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Tutup navigasi');
        navMenu.classList.add('active');
        hamburger.classList.add('active');
    });

    document.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            setSubmenuState(toggle, !isExpanded);
        });
    });

    navMenu.querySelectorAll('.nav-link, .dropdown-link').forEach((link) => {
        link.addEventListener('click', closeNavigation);
    });

    document.addEventListener('click', (event) => {
        if (event.target instanceof Element && !event.target.closest('.nav-container')) {
            closeNavigation();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNavigation();
            hamburger.focus();
        }
    });
});