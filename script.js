const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

const syncHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("scrolled", window.scrollY > 16);
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const showReveals = () => {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  };

  if ("requestAnimationFrame" in window) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(showReveals);
    });
  } else {
    showReveals();
  }
}

const yearElement = document.querySelector("[data-year]");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
