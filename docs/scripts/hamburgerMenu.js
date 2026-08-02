const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav');

// Toggle the 'active' class on click
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('fa-bars');
  hamburger.classList.toggle('fa-xmark');
});
