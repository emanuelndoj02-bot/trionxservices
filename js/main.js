/* =============================================
   TRIONX — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Sticky Header (border on scroll) ----
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // ---- Mobile Nav Toggle ----
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMobileNav() {
    if (mobileNav) mobileNav.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

  // ---- Mobile Dropdown Accordion ----
  var dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var content = this.nextElementSibling;
      if (content) content.classList.toggle('open');
    });
  });

  // ---- Contact Form Validation ----
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.error').forEach(function (el) {
        el.classList.remove('error');
      });
      contactForm.querySelectorAll('.form-error').forEach(function (el) {
        el.textContent = '';
      });

      // Required fields
      var requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('error');
          var errorEl = field.parentElement.querySelector('.form-error');
          if (errorEl) errorEl.textContent = 'This field is required.';
        }
      });

      // Email validation
      var emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          valid = false;
          emailField.classList.add('error');
          var errorEl = emailField.parentElement.querySelector('.form-error');
          if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
        }
      }

      // Phone validation
      var phoneField = contactForm.querySelector('input[type="tel"]');
      if (phoneField && phoneField.value.trim()) {
        var phonePattern = /^[\d\s\-\+\(\)]{7,}$/;
        if (!phonePattern.test(phoneField.value.trim())) {
          valid = false;
          phoneField.classList.add('error');
          var errorEl = phoneField.parentElement.querySelector('.form-error');
          if (errorEl) errorEl.textContent = 'Please enter a valid phone number.';
        }
      }

      if (valid) {
        var successEl = contactForm.querySelector('.form-success');
        if (successEl) {
          successEl.style.display = 'block';
          successEl.textContent = 'Thank you. Your message has been sent. We will be in touch shortly.';
        }
        contactForm.reset();
      }
    });
  }

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileNav();
      }
    });
  });

});
