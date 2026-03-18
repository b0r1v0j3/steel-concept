/**
 * STEEL CONCEPT
 * Main Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  // Auto update copyright year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Header scroll behavior (Hide on scroll down, show on scroll up)
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
          if (window.scrollY > lastScrollY) {
              // Scrolling down
              header.classList.add('hide-up');
          } else {
              // Scrolling up
              header.classList.remove('hide-up');
          }
      } else {
          header.classList.remove('hide-up');
      }
      lastScrollY = window.scrollY;
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', () => {
          mainNav.classList.toggle('active');
          menuToggle.classList.toggle('active');
          const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
          menuToggle.setAttribute('aria-expanded', !isExpanded);
      });

      // Close menu when clicking a link
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              mainNav.classList.remove('active');
              menuToggle.classList.remove('active');
              menuToggle.setAttribute('aria-expanded', 'false');
          });
      });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              e.preventDefault();
              const headerOffset = 80; // Size of fixed header
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Simple animation observer
  const animateElements = document.querySelectorAll('.fade-in-up');
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });

  animateElements.forEach(el => observer.observe(el));

  // Form submission handler
  const inquiryForm = document.getElementById('inquiryForm');
  const formMessage = document.getElementById('formMessage');

  if (inquiryForm) {
      inquiryForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const btn = inquiryForm.querySelector('button[type="submit"]');
          const originalText = btn.textContent;
          
          btn.textContent = 'Obradjujemo...';
          btn.disabled = true;

          // Mock sending delay
          setTimeout(() => {
              formMessage.textContent = 'Vaš zahtev je uspešno prosleđen direkciji. Kontaktiraćemo Vas vrlo brzo.';
              formMessage.style.color = '#27ae60'; // Success green
              btn.textContent = originalText;
              btn.disabled = false;
              inquiryForm.reset();
              
              setTimeout(() => {
                  formMessage.textContent = '';
              }, 6000);
          }, 1200);
      });
  }
});
