/**
 * STEEL CONCEPT - Clean JS
 * Minimalist Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Set Current Year
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-links a, .nav .btn');

  if (navToggle && nav) {
      navToggle.addEventListener('click', () => {
          nav.classList.toggle('active');
          
          // Animate hamburger
          const spans = navToggle.querySelectorAll('span');
          if (nav.classList.contains('active')) {
              spans[0].style.transform = 'rotate(45deg)';
              spans[0].style.top = '11px';
              spans[1].style.opacity = '0';
              spans[2].style.transform = 'rotate(-45deg)';
              spans[2].style.top = '11px';
          } else {
              spans[0].style.transform = 'rotate(0)';
              spans[0].style.top = '0px';
              spans[1].style.opacity = '1';
              spans[2].style.transform = 'rotate(0)';
              spans[2].style.top = '22px';
          }
      });

      // Close menu when a link is clicked
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              if (window.innerWidth <= 768) {
                  nav.classList.remove('active');
                  const spans = navToggle.querySelectorAll('span');
                  spans[0].style.transform = 'rotate(0)';
                  spans[0].style.top = '0px';
                  spans[1].style.opacity = '1';
                  spans[2].style.transform = 'rotate(0)';
                  spans[2].style.top = '22px';
              }
          });
      });
  }

  // Simple Form Submission hook
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const btn = contactForm.querySelector('button');
          const originalText = btn.textContent;
          btn.textContent = 'Slanje...';
          btn.disabled = true;

          setTimeout(() => {
              alert('Vaš zahtev je uspešno poslat. Kontaktiraćemo vas u najkraćem roku!');
              contactForm.reset();
              btn.textContent = originalText;
              btn.disabled = false;
          }, 1000);
      });
  }
});
