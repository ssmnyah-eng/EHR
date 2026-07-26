// Common utilities for Elevated Home Resets

// Intersection Observer for reveal animations
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => observer.observe(reveal));
}

// Delay reveals
function addRevealDelays() {
  document.querySelectorAll('[data-reveal-delay]').forEach(el => {
    const delay = el.dataset.revealDelay;
    el.style.transitionDelay = `${delay}ms`;
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('mobile-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('hidden');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.add('hidden');
      });
    });
  }
}

// Services dropdown in the primary nav
function initNavDropdown() {
  const dropdown = document.querySelector('.nav-dropdown');
  if (!dropdown) return;

  const toggle = dropdown.querySelector('.nav-dropdown-toggle');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('is-open');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('is-open');
    }
  });
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format date
function formatDate(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Smooth scroll to element
function smoothScroll(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  addRevealDelays();
  initMobileMenu();
  initNavDropdown();
});

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
    e.preventDefault();
    smoothScroll(e.target.getAttribute('href'));
  }
});
