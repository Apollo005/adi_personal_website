// Smooth Page Transitions
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

window.addEventListener('beforeunload', () => {
    document.body.classList.remove('loaded');
});

// Constellation Animation
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

const stars = [];
const maxStars = 100;

function Star(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 0.5 - 0.25;
    this.vy = Math.random() * 0.5 - 0.25;
    this.size = Math.random() * 2;
    this.alpha = Math.random();
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    });
}

function updateStars() {
    stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges
        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;
    });
}

function createStars() {
    for (let i = 0; i < maxStars; i++) {
        stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
createStars();
animate();

// Scroll Animation for Experience Page
const timelineItems = document.querySelectorAll('.timeline-item');

function checkScroll() {
    const triggerBottom = window.innerHeight / 5 * 4;

    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        darkModeToggle.textContent = 'Light Mode';
    }
}

// Check for high contrast preference
const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches;

function updateTheme() {
    if (body.classList.contains('dark-mode')) {
        if (prefersHighContrast) {
            body.classList.add('high-contrast');
        } else {
            body.classList.remove('high-contrast');
        }
    }
}

// Initial theme update
updateTheme();

// Listen for changes in contrast preference
window.matchMedia('(prefers-contrast: more)').addListener(() => {
    updateTheme();
});

// Update the dark mode toggle event listener
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update button text and theme
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark-mode');
        updateTheme();
    } else {
        darkModeToggle.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light-mode');
        body.classList.remove('high-contrast');
    }
});

