// assets/js/main.js

// Année dynamique
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  // Ferme le menu mobile au clic d’un lien
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}

// Thème (clair/sombre) persistant
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

function initTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) {
    applyTheme(stored);
  } else {
    // Préf système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
}
initTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Scrollspy simple : active le lien de la section visible
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = '#' + entry.target.id;
      const link = document.querySelector(`.nav-link[href="${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('text-blue-600', 'font-semibold'));
        link.classList.add('text-blue-600', 'font-semibold');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 }
);

sections.forEach(sec => observer.observe(sec));
