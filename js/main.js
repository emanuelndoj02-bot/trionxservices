/* =============================================
   TRIONX - Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

    // ---- Sticky Header ----
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });

    // ---- Back to Top ----
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Mobile Navigation ----
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            mainNav.classList.toggle('open');
        });

        // Close menu on link click
        mainNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('open');
                }
            });
        });

        // Dropdown toggle on mobile
        const dropdownItems = mainNav.querySelectorAll('.has-dropdown');
        dropdownItems.forEach(function (item) {
            item.querySelector('a').addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        });
    }

    // ---- Hero Slider ----
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dots .dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(function (slide) { slide.classList.remove('active'); });
        dots.forEach(function (dot) { dot.classList.remove('active'); });

        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        currentSlide = index;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetSlider() {
        clearInterval(slideInterval);
        startSlider();
    }

    if (slides.length > 0) {
        startSlider();

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                nextSlide();
                resetSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                prevSlide();
                resetSlider();
            });
        }

        dots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                showSlide(index);
                resetSlider();
            });
        });
    }

    // ---- Counter Animation ----
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        counters.forEach(function (counter) {
            if (counter.dataset.animated) return;

            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    counter.dataset.animated = 'true';
                }
            }

            updateCounter();
        });
    }

    // ---- Scroll Animations ----
    function handleScrollAnimations() {
        // Counter animation check
        var statsBox = document.querySelector('.stats-box');
        if (statsBox) {
            var rect = statsBox.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                animateCounters();
            }
        }

        // Fade in elements
        var fadeEls = document.querySelectorAll('.fade-in');
        fadeEls.forEach(function (el) {
            var elRect = el.getBoundingClientRect();
            if (elRect.top < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations();

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                var offsetTop = targetEl.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Scroll to hash on page load (for service links from other pages) ----
    if (window.location.hash) {
        setTimeout(function () {
            var hashEl = document.querySelector(window.location.hash);
            if (hashEl) {
                var offsetTop = hashEl.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 300);
    }

    // ---- Contact Form Handling ----
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simple validation
            var name = this.querySelector('[name="name"]');
            var email = this.querySelector('[name="email"]');
            var message = this.querySelector('[name="message"]');
            var isValid = true;

            [name, email, message].forEach(function (field) {
                if (field && !field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    isValid = false;
                } else if (field) {
                    field.style.borderColor = '';
                }
            });

            if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                email.style.borderColor = '#e74c3c';
                isValid = false;
            }

            if (isValid) {
                // Show success message
                var btn = this.querySelector('button[type="submit"]');
                var originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent Successfully!';
                btn.style.background = '#27ae60';
                btn.disabled = true;

                setTimeout(function () {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }
        });
    }
});
