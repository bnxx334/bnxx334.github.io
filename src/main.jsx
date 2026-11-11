import { createRoot } from 'react-dom/client';
import { animate, inView, motion, useReducedMotion } from 'framer-motion';

function HeroTitle() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: 'easeOut' }}
        >
            Halo, Saya <span className="highlight">Banyu Handika</span>
        </motion.h1>
    );
}

const heroTitleRoot = document.getElementById('hero-title-root');

if (heroTitleRoot) {
    createRoot(heroTitleRoot).render(<HeroTitle />);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealTargets = document.querySelectorAll(
        '.section-title, .about-text p, .skill-category, .project-card, ' +
        '.activity-card, .cert-card, .contact-form, .contact-info, .thanks-container'
    );

    revealTargets.forEach((element, index) => {
        inView(
            element,
            () => {
                const controls = animate(
                    element,
                    { opacity: [0, 1] },
                    {
                        duration: 0.45,
                        delay: (index % 4) * 0.07,
                        ease: [0.22, 1, 0.36, 1]
                    }
                );
                return () => controls.stop();
            },
            { once: true, amount: 0.15 }
        );
    });
}
