// Search functionality
const searchInput = document.getElementById('searchInput');
const certCards = document.querySelectorAll('.cert-card');
const noResults = document.getElementById('noResults');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentFilter = 'all';

searchInput.addEventListener('input', filterCertificates);

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterBtns.forEach(button => {
            button.setAttribute('aria-pressed', String(button === this));
        });
        currentFilter = this.dataset.filter;
        filterCertificates();
    });
});

function filterCertificates() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    certCards.forEach(card => {
        const searchableText = card.textContent.toLowerCase();
        const categories = card.dataset.category.split(/\s+/);
        
        const matchesSearch = searchableText.includes(searchTerm);
        const matchesFilter = currentFilter === 'all'
            || (currentFilter === 'verified'
                ? card.querySelector('.cert-badge.verified') !== null
                : categories.includes(currentFilter));

        if (matchesSearch && matchesFilter) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    if (visibleCount === 0) {
        noResults.classList.add('show');
    } else {
        noResults.classList.remove('show');
    }
}

// Counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Animate counters on page load
window.addEventListener('load', () => {
    const totalCerts = document.getElementById('totalCerts');
    if (totalCerts) {
        animateCounter(totalCerts, parseInt(totalCerts.textContent));
    }
});
