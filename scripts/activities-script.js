// Search functionality
const searchInput = document.getElementById('searchInput');
const activityCards = document.querySelectorAll('.activity-card');
const noResults = document.getElementById('noResults');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentFilter = 'all';

searchInput.addEventListener('input', filterActivities);

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        filterActivities();
    });
});

function filterActivities() {
    const searchTerm = searchInput.value.toLowerCase();
    let visibleCount = 0;

    activityCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const category = card.dataset.category;
        
        const matchesSearch = name.includes(searchTerm);
        const matchesFilter = currentFilter === 'all' || category === currentFilter;

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

    // Update total activities counter
    const totalActivities = document.getElementById('totalActivities');
    if (totalActivities) {
        totalActivities.textContent = visibleCount;
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
    const totalActivities = document.getElementById('totalActivities');
    if (totalActivities) {
        animateCounter(totalActivities, activityCards.length);
    }
});
